import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "cartforge_dev_secret_key_2026_safe_jwt";

const ADMIN_SELLER_EMAIL = "prasmitraj056@gmail.com";

/**
 * Express middleware to protect routes requiring authentication.
 * Decodes JWT session token and attaches req.user.
 */
export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Not authorized, no session token provided.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account no longer exists.",
      });
    }

    // Auto-promote special admin/seller email if not already set in DB
    if (user.email.toLowerCase() === ADMIN_SELLER_EMAIL && user.role !== "SELLER") {
      user.role = "SELLER";
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "SELLER" },
      }).catch((err) => console.error("[ROLE AUTO-UPDATE ERROR]", err));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid token.",
      error: error.message,
    });
  }
};

/**
 * Alias for protect middleware for authorization compatibility.
 */
export const verifyToken = protect;

/**
 * Express middleware to guard seller-only routes.
 * Blocks Buyers with 403 Forbidden.
 */
export const requireSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Access denied. User authentication required.",
    });
  }

  const isSellerUser =
    req.user.role === "SELLER" ||
    req.user.email?.toLowerCase() === ADMIN_SELLER_EMAIL;

  if (!isSellerUser) {
    return res.status(403).json({
      success: false,
      message: "Access denied: Seller privileges required.",
    });
  }

  next();
};

/**
 * Generic Express middleware to enforce specific roles.
 * @param {string} allowedRole ('BUYER' | 'SELLER')
 */
export const requireRole = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. User authentication required.",
      });
    }

    const hasAccess =
      req.user.role === allowedRole ||
      (allowedRole === "SELLER" && req.user.email?.toLowerCase() === ADMIN_SELLER_EMAIL);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: `Access denied: ${allowedRole} privileges required.`,
      });
    }

    next();
  };
};

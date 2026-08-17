| File                 | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `server.js`          | Starts Express, CORS, JSON middleware, connects routes |
| `auth.routes.js`     | Defines `/login`, `/signup`, `/verifyloginotp`, etc.   |
| `auth.controller.js` | Receives `req`, calls services, sends `res`            |
| `auth.service.js`    | Main authentication logic                              |
| `otp.service.js`     | Generate, store/check, expire OTPs                     |
| `email.service.js`   | Send OTP emails                                        |
| `auth.middleware.js` | Protect logged-in routes                               |
| `user.model.js`      | User/database-related operations                       |
| `generateOtp.js`     | Small OTP generation helper                            |
| `hashPassword.js`    | Password hashing/comparison                            |
| `schema.prisma`      | Database schema if using Prisma                        |

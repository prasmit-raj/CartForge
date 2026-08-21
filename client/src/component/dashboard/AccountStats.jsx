import { useApp } from "../../context/AppContext";

export default function AccountStats({ user }) {
  const { role, cart, wishlist } = useApp();

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Account Information Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-800">Account Profile</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {role}
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">Name: </span>
              {user.name || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Email: </span>
              <span className="break-all">{user.email}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Verification: </span>
              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                Verified Account
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 mt-4 text-xs text-slate-400">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Quick Shopping Stats Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-3">Shopping Overview</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-2xl font-extrabold text-blue-600">{cart.length}</p>
            <p className="text-xs text-slate-500 font-medium">Cart Items</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-2xl font-extrabold text-red-500">{wishlist.length}</p>
            <p className="text-xs text-slate-500 font-medium">Wishlist Saved</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Active Role Session</span>
          <span className="font-bold text-slate-700">{role} Mode</span>
        </div>
      </div>

      {/* Session Security Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Security & ID</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">User ID: </span>
              <code className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">
                {user.id}
              </code>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Authentication: </span>
              <span className="text-green-600 font-semibold">HTTP-Only Cookie</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 mt-4 text-xs text-slate-400">
          Encrypted 256-bit JWT Session
        </div>
      </div>
    </div>
  );
}

import SideNav from "../components/SideNav";

export default function Page() {
  const stats = [
    {
      title: "Total Outstanding",
      value: "$45,231.89",
      change: "+20.1% from last month",
    },
    { title: "Active Loans", value: "127", change: "+4 new this month" },
    {
      title: "Overdue Payments",
      value: "23",
      change: "Requires attention",
      alert: true,
    },
    {
      title: "On-time Payments",
      value: "89%",
      change: "+2% from last month",
      success: true,
    },
  ];

  const payments = [
    {
      name: "Sarah Johnson",
      date: "3/28/2024",
      amount: "+$850",
      initials: "SJ",
      color: "bg-red-500",
    },
    {
      name: "Michael Brown",
      date: "3/27/2024",
      amount: "+$1200",
      initials: "MB",
      color: "bg-red-600",
    },
    {
      name: "Emily Davis",
      date: "3/26/2024",
      amount: "+$750",
      initials: "ED",
      color: "bg-blue-500",
    },
  ];

  return (
    <section className="flex">
      <SideNav />
      <div className="w-full">
        <header className="border-b border-black w-full p-2">
          <h2 className="text-xl font-semibold">Loan Management</h2>
        </header>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="pr-8 pl-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-6 ">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white pt-4 pb-4 pr-10 pl-10 rounded shadow-md"
              >
                <h2 className="text-sm text-gray-500">{stat.title}</h2>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-sm ${
                    stat.alert
                      ? "text-red-500"
                      : stat.success
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Recent Payments</h2>
            <p className="text-sm text-gray-500 mb-4">
              Latest payment transactions from debtors
            </p>

            {payments.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b py-4 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`${payment.color} text-white font-bold w-10 h-10 flex items-center justify-center rounded-full`}
                  >
                    {payment.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{payment.name}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">{payment.amount}</p>
              </div>
            ))}
          </div>
        </div>

        </div>
      
    </section>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, DollarSign, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { dashboardStats, attendanceChartData, revenueChartData } from "@/data/mockData";

const StatCard = ({ title, value, icon: Icon, trend, description }: any) => (
  <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-0">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3 text-success" />
          <span className="text-xs text-success font-medium">+{trend}%</span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const pieData = [
    { name: 'Present', value: 85, color: 'hsl(var(--success))' },
    { name: 'Absent', value: 10, color: 'hsl(var(--destructive))' },
    { name: 'Late', value: 5, color: 'hsl(var(--warning))' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground bg-gradient-hero bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your school today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={dashboardStats.totalStudents.toLocaleString()}
          icon={Users}
          trend={dashboardStats.monthlyGrowth.students}
          description="Active enrollments"
        />
        <StatCard
          title="Total Staff"
          value={dashboardStats.totalStaff}
          icon={UserCheck}
          description="Teaching & non-teaching"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={dashboardStats.monthlyGrowth.revenue}
          description="Fees collected this month"
        />
        <StatCard
          title="Attendance Rate"
          value={`${dashboardStats.attendanceRate}%`}
          icon={Calendar}
          trend={dashboardStats.monthlyGrowth.attendance}
          description="Overall attendance"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Attendance Trend Chart */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Attendance Trend
            </CardTitle>
            <CardDescription>Monthly attendance percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-secondary" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly fee collection over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="revenue" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Today's Attendance Distribution */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-lg">Today's Attendance</CardTitle>
            <CardDescription>Distribution of attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer">
              <span className="font-medium">Mark Attendance</span>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer">
              <span className="font-medium">Add New Student</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer">
              <span className="font-medium">Generate Reports</span>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-success text-success-foreground mt-1">New</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">5 new student admissions</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-warning text-warning-foreground mt-1">Fee</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">12 fee reminders sent</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-primary text-primary-foreground mt-1">Report</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">Monthly report generated</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
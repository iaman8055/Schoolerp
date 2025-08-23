import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, DollarSign, Clock, TrendingUp, Download, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HRPayroll = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState("march-2024");

  const employees = [
    {
      id: 1,
      name: "Dr. Jane Wilson",
      employeeId: "EMP001",
      department: "Mathematics",
      position: "Senior Teacher",
      basicSalary: 55000,
      allowances: 12000,
      deductions: 8500,
      netSalary: 58500,
      status: "processed"
    },
    {
      id: 2,
      name: "Prof. David Anderson",
      employeeId: "EMP002",
      department: "Science",
      position: "Department Head",
      basicSalary: 65000,
      allowances: 15000,
      deductions: 10000,
      netSalary: 70000,
      status: "processed"
    },
    {
      id: 3,
      name: "Ms. Lisa Martinez",
      employeeId: "EMP003",
      department: "English",
      position: "Teacher",
      basicSalary: 48000,
      allowances: 10000,
      deductions: 7200,
      netSalary: 50800,
      status: "pending"
    }
  ];

  const payrollSummary = {
    totalEmployees: 89,
    totalSalary: 4567000,
    totalAllowances: 897000,
    totalDeductions: 634000,
    netPayroll: 4830000
  };

  const leaveRequests = [
    { id: 1, employee: "Dr. Jane Wilson", type: "Sick Leave", days: 2, status: "approved", date: "2024-03-15" },
    { id: 2, employee: "Ms. Lisa Martinez", type: "Annual Leave", days: 5, status: "pending", date: "2024-03-20" },
    { id: 3, employee: "Prof. David Anderson", type: "Medical Leave", days: 3, status: "approved", date: "2024-03-18" }
  ];

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processed",
      description: "Payroll for March 2024 has been successfully processed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">HR & Payroll</h1>
          <p className="text-muted-foreground">Manage employee data, payroll, and leave requests</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march-2024">March 2024</SelectItem>
              <SelectItem value="february-2024">February 2024</SelectItem>
              <SelectItem value="january-2024">January 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleProcessPayroll} className="gap-2">
            <DollarSign className="h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Badge variant="secondary">{payrollSummary.totalEmployees}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active staff members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{payrollSummary.totalSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Basic salary amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Allowances</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{payrollSummary.totalAllowances.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total allowances</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{payrollSummary.netPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">After deductions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payroll" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payroll">Payroll Management</TabsTrigger>
          <TabsTrigger value="employees">Employee Records</TabsTrigger>
          <TabsTrigger value="leaves">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Staff Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Processing</CardTitle>
              <CardDescription>Process monthly salaries and generate payslips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search employees..." className="pl-8 w-64" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Payroll
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>₹{employee.basicSalary.toLocaleString()}</TableCell>
                        <TableCell>₹{employee.allowances.toLocaleString()}</TableCell>
                        <TableCell>₹{employee.deductions.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">₹{employee.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={employee.status === "processed" ? "default" : "secondary"}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Records</CardTitle>
              <CardDescription>Manage employee information and contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search employees..." className="pl-8 w-64" />
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Employee
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                        <DialogDescription>Enter employee details to create a new record</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emp-name">Full Name</Label>
                          <Input id="emp-name" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-id">Employee ID</Label>
                          <Input id="emp-id" placeholder="EMP001" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-dept">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-position">Position</Label>
                          <Input id="emp-position" placeholder="Teacher/Admin/etc." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-salary">Basic Salary</Label>
                          <Input id="emp-salary" type="number" placeholder="50000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emp-joining">Joining Date</Label>
                          <Input id="emp-joining" type="date" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Add Employee</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employees.map((employee) => (
                    <Card key={employee.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                          </div>
                          <Badge variant="outline">{employee.position}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Department:</span>
                            <span className="text-sm font-medium">{employee.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Salary:</span>
                            <span className="text-sm font-medium">₹{employee.basicSalary.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">View</Button>
                          <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Leave Management
              </CardTitle>
              <CardDescription>Manage employee leave requests and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.employee}</TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>{leave.days} days</TableCell>
                      <TableCell>{leave.date}</TableCell>
                      <TableCell>
                        <Badge variant={leave.status === "approved" ? "default" : "secondary"}>
                          {leave.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {leave.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Approve</Button>
                            <Button size="sm" variant="outline">Reject</Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Attendance Tracking</CardTitle>
              <CardDescription>Monitor and manage staff attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Staff attendance tracking functionality will be implemented here.
                <br />
                Features: Clock in/out, attendance reports, overtime tracking
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRPayroll;
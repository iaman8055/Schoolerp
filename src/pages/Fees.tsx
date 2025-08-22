import { useState } from "react";
import { DollarSign, CreditCard, TrendingUp, AlertCircle, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockStudents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Fees() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const feeStructure = [
    { type: 'Tuition Fee', amount: 5000, frequency: 'Monthly' },
    { type: 'Library Fee', amount: 200, frequency: 'Semester' },
    { type: 'Transport Fee', amount: 1500, frequency: 'Monthly' },
    { type: 'Activity Fee', amount: 500, frequency: 'Yearly' },
  ];

  const studentFees = mockStudents.map(student => ({
    ...student,
    totalAmount: 6500,
    paidAmount: student.feeStatus === 'paid' ? 6500 : student.feeStatus === 'pending' ? 3000 : 0,
    dueAmount: student.feeStatus === 'paid' ? 0 : student.feeStatus === 'pending' ? 3500 : 6500,
    lastPayment: student.feeStatus === 'paid' ? '2024-02-15' : student.feeStatus === 'pending' ? '2024-01-15' : null,
  }));

  const totalRevenue = studentFees.reduce((acc, student) => acc + student.paidAmount, 0);
  const totalDue = studentFees.reduce((acc, student) => acc + student.dueAmount, 0);
  const paidStudents = studentFees.filter(s => s.feeStatus === 'paid').length;
  const overdueStudents = studentFees.filter(s => s.feeStatus === 'overdue').length;

  const handleProcessPayment = (studentId: string) => {
    toast({
      title: "Payment Processed",
      description: "Payment has been successfully processed.",
    });
  };

  const handleAddFeeType = () => {
    toast({
      title: "Fee Type Added",
      description: "New fee type has been added to the structure.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground">Manage fees, invoices, and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Fee Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Fee Type</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="feeType">Fee Type</Label>
                  <Input id="feeType" placeholder="Enter fee type" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="semester">Semester</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFeeType}>Add Fee Type</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalDue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              {overdueStudents} overdue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidStudents}</div>
            <p className="text-xs text-muted-foreground">
              {((paidStudents / studentFees.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {((totalRevenue / (totalRevenue + totalDue)) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Student Payments</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Student Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentFees.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>${student.totalAmount}</TableCell>
                      <TableCell className="text-green-600">${student.paidAmount}</TableCell>
                      <TableCell className="text-red-600">${student.dueAmount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            student.feeStatus === 'paid' ? 'default' :
                            student.feeStatus === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleProcessPayment(student.id)}
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Pay
                          </Button>
                          <Button variant="outline" size="sm">
                            Invoice
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeStructure.map((fee, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{fee.type}</TableCell>
                      <TableCell>${fee.amount}</TableCell>
                      <TableCell>{fee.frequency}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Invoice Generation</h3>
                <p className="text-muted-foreground">Generate and manage student invoices</p>
                <Button className="mt-4">Generate Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Expense Management</h3>
                <p className="text-muted-foreground">Track school expenses and financial records</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
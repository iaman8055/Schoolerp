import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Eye, Users, UserPlus } from "lucide-react";
import { mockStudents, type Student } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Students = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    toast({
      title: "Student Added",
      description: "New student has been successfully added to the system.",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditStudent = (studentId: string) => {
    toast({
      title: "Edit Student",
      description: "Student edit functionality would be implemented here.",
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({
      title: "Student Deleted",
      description: "Student has been removed from the system.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-success text-success-foreground">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 90) {
      return <Badge className="bg-success text-success-foreground">{attendance}%</Badge>;
    } else if (attendance >= 75) {
      return <Badge className="bg-warning text-warning-foreground">{attendance}%</Badge>;
    } else {
      return <Badge className="bg-destructive text-destructive-foreground">{attendance}%</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground bg-gradient-hero bg-clip-text text-transparent">
            Student Management
          </h1>
          <p className="text-muted-foreground">Manage student profiles, enrollment, and academic information</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft hover:shadow-medium transition-all">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter student information to add them to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9th Grade">9th Grade</SelectItem>
                      <SelectItem value="10th Grade">10th Grade</SelectItem>
                      <SelectItem value="11th Grade">11th Grade</SelectItem>
                      <SelectItem value="12th Grade">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" placeholder="Enter roll number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter complete address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input id="guardianName" placeholder="Enter guardian name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input id="guardianPhone" placeholder="Enter guardian phone" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent} className="bg-gradient-primary">
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{students.length}</div>
            <p className="text-xs text-success">+5 this month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Enrollments</CardTitle>
            <UserPlus className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{students.filter(s => s.feeStatus !== 'overdue').length}</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Attendance</CardTitle>
            <Eye className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
            </div>
            <p className="text-xs text-success">+2% vs last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fee Pending</CardTitle>
            <Trash2 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {students.filter(s => s.feeStatus === 'pending' || s.feeStatus === 'overdue').length}
            </div>
            <p className="text-xs text-warning">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>Search and filter students by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="9th Grade">9th Grade</SelectItem>
                <SelectItem value="10th Grade">10th Grade</SelectItem>
                <SelectItem value="11th Grade">11th Grade</SelectItem>
                <SelectItem value="12th Grade">12th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class & Section</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.profilePicture} />
                        <AvatarFallback>
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{student.class}</div>
                    <div className="text-sm text-muted-foreground">Section {student.section}</div>
                  </TableCell>
                  <TableCell className="font-mono">{student.rollNumber}</TableCell>
                  <TableCell>
                    <div className="text-sm">{student.phone}</div>
                    <div className="text-xs text-muted-foreground">{student.guardianName}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.feeStatus)}</TableCell>
                  <TableCell>{getAttendanceBadge(student.attendance)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditStudent(student.id)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
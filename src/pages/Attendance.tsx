import { useState } from "react";
import { Calendar, Users, Clock, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStudents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const classes = [...new Set(mockStudents.map(s => s.class))];
  
  const attendanceData = mockStudents.map(student => ({
    ...student,
    status: Math.random() > 0.1 ? 'present' : Math.random() > 0.5 ? 'absent' : 'late'
  }));

  const filteredAttendance = attendanceData.filter(student => 
    selectedClass === "all" || student.class === selectedClass
  );

  const stats = {
    present: filteredAttendance.filter(s => s.status === 'present').length,
    absent: filteredAttendance.filter(s => s.status === 'absent').length,
    late: filteredAttendance.filter(s => s.status === 'late').length,
    total: filteredAttendance.length
  };

  const attendanceRate = ((stats.present + stats.late) / stats.total * 100).toFixed(1);

  const handleMarkAttendance = (studentId: string, status: string) => {
    toast({
      title: "Attendance Updated",
      description: `Student attendance marked as ${status}`,
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Attendance data uploaded successfully",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkUpload}>
            <Download className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.present / stats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.absent / stats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Late Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.late / stats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +2.1% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance - {selectedDate}</CardTitle>
              <div className="flex gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.class} {student.section}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            student.status === 'present' ? 'default' :
                            student.status === 'absent' ? 'destructive' : 'secondary'
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAttendance(student.id, 'present')}
                          >
                            Present
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAttendance(student.id, 'absent')}
                          >
                            Absent
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAttendance(student.id, 'late')}
                          >
                            Late
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

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  Daily Report
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  Monthly Report
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  Yearly Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Leave Management</h3>
                <p className="text-muted-foreground">Manage student and staff leave applications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
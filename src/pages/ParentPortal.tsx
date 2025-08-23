import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, BookOpen, MessageCircle, Award, TrendingUp, AlertCircle } from "lucide-react";

const ParentPortal = () => {
  const studentInfo = {
    name: "Emma Johnson",
    class: "9th Grade B",
    rollNumber: "9B015",
    section: "B",
    admissionNumber: "2023042",
    parentName: "Sarah Johnson",
    parentEmail: "sarah.johnson@email.com",
    parentPhone: "+1234567893"
  };

  const attendanceData = {
    totalDays: 180,
    presentDays: 168,
    absentDays: 8,
    lateDays: 4,
    percentage: 93.3
  };

  const academicProgress = [
    { subject: "Mathematics", grade: "A-", marks: 87, totalMarks: 100, teacher: "Dr. Jane Wilson" },
    { subject: "Science", grade: "B+", marks: 82, totalMarks: 100, teacher: "Prof. David Anderson" },
    { subject: "English", grade: "A", marks: 91, totalMarks: 100, teacher: "Ms. Lisa Martinez" },
    { subject: "History", grade: "B", marks: 78, totalMarks: 100, teacher: "Mr. Robert Davis" },
    { subject: "Geography", grade: "A-", marks: 85, totalMarks: 100, teacher: "Ms. Emily Chen" }
  ];

  const upcomingExams = [
    { subject: "Mathematics", date: "2024-03-25", time: "09:00 AM", duration: "3 hours", syllabus: "Chapters 1-5" },
    { subject: "Science", date: "2024-03-28", time: "02:00 PM", duration: "2.5 hours", syllabus: "Physics Unit 1-3" },
    { subject: "English", date: "2024-04-02", time: "10:00 AM", duration: "3 hours", syllabus: "Literature & Grammar" }
  ];

  const feeDetails = {
    totalFee: 45000,
    paidAmount: 30000,
    pendingAmount: 15000,
    dueDate: "2024-04-15",
    status: "Partial Payment"
  };

  const recentActivities = [
    { date: "2024-03-15", activity: "Submitted Mathematics Assignment", type: "academic" },
    { date: "2024-03-14", activity: "Attended Parent-Teacher Meeting", type: "meeting" },
    { date: "2024-03-13", activity: "Library Book Issued: 'Advanced Physics'", type: "library" },
    { date: "2024-03-12", activity: "Participated in Science Fair", type: "event" },
    { date: "2024-03-11", activity: "Fee Payment Received", type: "finance" }
  ];

  const announcements = [
    {
      date: "2024-03-16",
      title: "Mid-Term Examination Schedule Released",
      content: "The mid-term examination schedule has been published. Please check the exam dates and prepare accordingly.",
      priority: "high"
    },
    {
      date: "2024-03-15", 
      title: "Parent-Teacher Meeting Next Week",
      content: "Individual parent-teacher meetings are scheduled for next week. Please book your slot.",
      priority: "medium"
    },
    {
      date: "2024-03-14",
      title: "Annual Sports Day - March 30th",
      content: "Annual sports day will be conducted on March 30th. All students are expected to participate.",
      priority: "low"
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Portal</h1>
          <p className="text-muted-foreground">Monitor your child's academic progress and school activities</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Logged in as</p>
          <p className="font-semibold">{studentInfo.parentName}</p>
        </div>
      </div>

      {/* Student Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg font-semibold">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl">{studentInfo.name}</h2>
              <p className="text-sm text-muted-foreground">
                {studentInfo.class} • Roll No: {studentInfo.rollNumber}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{attendanceData.percentage}%</div>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">B+</div>
              <p className="text-sm text-muted-foreground">Overall Grade</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-sm text-muted-foreground">Upcoming Exams</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="academics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="communication">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="academics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Academic Progress
              </CardTitle>
              <CardDescription>Current semester performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academicProgress.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{subject.subject}</h4>
                        <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Teacher: {subject.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{subject.marks}/{subject.totalMarks}</div>
                      <Progress 
                        value={(subject.marks / subject.totalMarks) * 100} 
                        className="w-24 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
                      </div>
                      <Badge variant={getPriorityColor(announcement.priority)} className="ml-2">
                        {announcement.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{attendanceData.presentDays}</div>
                  <p className="text-sm text-muted-foreground">Present Days</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">{attendanceData.absentDays}</div>
                  <p className="text-sm text-muted-foreground">Absent Days</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{attendanceData.lateDays}</div>
                  <p className="text-sm text-muted-foreground">Late Days</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{attendanceData.percentage}%</div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Attendance Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {attendanceData.presentDays}/{attendanceData.totalDays} days
                  </span>
                </div>
                <Progress value={attendanceData.percentage} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Examinations
              </CardTitle>
              <CardDescription>Schedule of upcoming tests and examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Syllabus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingExams.map((exam, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{exam.subject}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.syllabus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Fee Details
              </CardTitle>
              <CardDescription>Current academic year fee status and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">₹{feeDetails.totalFee.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total Fee</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{feeDetails.paidAmount.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Paid Amount</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">₹{feeDetails.pendingAmount.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Pending Amount</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 border rounded-lg bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-800">Payment Due</h4>
                </div>
                <p className="text-sm text-orange-700">
                  Next installment of ₹{feeDetails.pendingAmount.toLocaleString()} is due on {feeDetails.dueDate}
                </p>
                <Button className="mt-3" size="sm">Make Payment</Button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Payment Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {((feeDetails.paidAmount / feeDetails.totalFee) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={(feeDetails.paidAmount / feeDetails.totalFee) * 100} 
                  className="h-3" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Timeline of your child's school activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border-l-2 border-primary pl-4">
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Messages & Communication
              </CardTitle>
              <CardDescription>Messages from teachers and school administration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold mb-2">No New Messages</h3>
                <p>You're all caught up! Check back later for new messages from teachers.</p>
                <Button className="mt-4" variant="outline">Compose Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentPortal;
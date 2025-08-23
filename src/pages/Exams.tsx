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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Search, Calendar as CalendarIcon, FileText, Award, BarChart3, Clock, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const Exams = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const exams = [
    {
      id: 1,
      name: "Mid-Term Mathematics",
      class: "10th Grade A",
      subject: "Mathematics",
      date: "2024-03-25",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      totalMarks: 100,
      status: "scheduled",
      teacher: "Dr. Jane Wilson"
    },
    {
      id: 2,
      name: "Science Practical Exam",
      class: "11th Grade B",
      subject: "Physics",
      date: "2024-03-28",
      time: "02:00 PM - 05:00 PM",
      duration: "3 hours",
      totalMarks: 50,
      status: "scheduled",
      teacher: "Prof. David Anderson"
    },
    {
      id: 3,
      name: "English Literature Test",
      class: "9th Grade A",
      subject: "English",
      date: "2024-03-22",
      time: "10:00 AM - 01:00 PM",
      duration: "3 hours",
      totalMarks: 80,
      status: "completed",
      teacher: "Ms. Lisa Martinez"
    }
  ];

  const results = [
    {
      id: 1,
      exam: "English Literature Test",
      class: "9th Grade A",
      totalStudents: 35,
      appeared: 33,
      passed: 29,
      failed: 4,
      avgScore: 76.5,
      highestScore: 98,
      lowestScore: 42
    },
    {
      id: 2,
      exam: "Mathematics Quarter Exam",
      class: "10th Grade B",
      totalStudents: 38,
      appeared: 37,
      passed: 32,
      failed: 5,
      avgScore: 72.3,
      highestScore: 95,
      lowestScore: 38
    }
  ];

  const gradeDistribution = [
    { grade: "A+", count: 12, percentage: 32.4 },
    { grade: "A", count: 8, percentage: 21.6 },
    { grade: "B+", count: 7, percentage: 18.9 },
    { grade: "B", count: 6, percentage: 16.2 },
    { grade: "C+", count: 3, percentage: 8.1 },
    { grade: "F", count: 1, percentage: 2.7 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'ongoing': return 'secondary';
      case 'completed': return 'outline';
      default: return 'default';
    }
  };

  const handleCreateExam = () => {
    toast({
      title: "Exam Created",
      description: "New exam has been scheduled successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exam Management</h1>
          <p className="text-muted-foreground">Schedule exams, manage results and generate reports</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Exam</DialogTitle>
              <DialogDescription>Enter exam details to create a new examination</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exam-name">Exam Name</Label>
                <Input id="exam-name" placeholder="Mid-term Mathematics" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9a">9th Grade A</SelectItem>
                    <SelectItem value="9b">9th Grade B</SelectItem>
                    <SelectItem value="10a">10th Grade A</SelectItem>
                    <SelectItem value="10b">10th Grade B</SelectItem>
                    <SelectItem value="11a">11th Grade A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Exam Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input id="duration" type="number" placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-marks">Total Marks</Label>
                <Input id="total-marks" type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Supervising Teacher</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jane">Dr. Jane Wilson</SelectItem>
                    <SelectItem value="david">Prof. David Anderson</SelectItem>
                    <SelectItem value="lisa">Ms. Lisa Martinez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleCreateExam}>Schedule Exam</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74.2%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Examination Schedule</CardTitle>
              <CardDescription>View and manage upcoming examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search exams..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="9a">9th Grade A</SelectItem>
                      <SelectItem value="10a">10th Grade A</SelectItem>
                      <SelectItem value="11a">11th Grade A</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.name}</TableCell>
                        <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.subject}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{exam.date}</div>
                            <div className="text-sm text-muted-foreground">{exam.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {exam.duration}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{exam.totalMarks}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(exam.status)}>
                            {exam.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">View</Button>
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

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Results</CardTitle>
              <CardDescription>View and analyze examination results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{result.exam}</CardTitle>
                      <CardDescription>{result.class}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{result.totalStudents}</div>
                          <p className="text-sm text-muted-foreground">Total Students</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{result.appeared}</div>
                          <p className="text-sm text-muted-foreground">Appeared</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{result.passed}</div>
                          <p className="text-sm text-muted-foreground">Passed</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-destructive">{result.failed}</div>
                          <p className="text-sm text-muted-foreground">Failed</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-xl font-bold">{result.avgScore}%</div>
                          <p className="text-sm text-muted-foreground">Average Score</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-xl font-bold">{result.highestScore}%</div>
                          <p className="text-sm text-muted-foreground">Highest Score</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-xl font-bold">{result.lowestScore}%</div>
                          <p className="text-sm text-muted-foreground">Lowest Score</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed analysis of student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
                  <div className="space-y-3">
                    {gradeDistribution.map((grade) => (
                      <div key={grade.grade} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="w-12 justify-center">
                            {grade.grade}
                          </Badge>
                          <span>{grade.count} students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${grade.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12">
                            {grade.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Examination Reports</CardTitle>
              <CardDescription>Generate and download various examination reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Student Report Cards</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Individual report cards for all students
                  </p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report Cards
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Class Performance Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Overall class performance analysis
                  </p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Subject Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subject-wise performance breakdown
                  </p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Analysis
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Attendance vs Performance</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Correlation between attendance and scores
                  </p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Exams;
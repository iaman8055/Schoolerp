import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Play, BookOpen, Users, Award, Clock, FileText, Video, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ELearning = () => {
  const { toast } = useToast();

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics - Calculus",
      instructor: "Dr. Jane Wilson",
      subject: "Mathematics", 
      grade: "11th Grade",
      duration: "8 weeks",
      lessons: 24,
      students: 35,
      progress: 65,
      status: "ongoing",
      thumbnail: "📊",
      description: "Comprehensive course covering differential and integral calculus"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. David Anderson",
      subject: "Physics",
      grade: "10th Grade", 
      duration: "10 weeks",
      lessons: 30,
      students: 42,
      progress: 45,
      status: "ongoing",
      thumbnail: "⚡",
      description: "Introduction to mechanics, waves, and thermodynamics"
    },
    {
      id: 3,
      title: "English Literature Classics",
      instructor: "Ms. Lisa Martinez",
      subject: "English",
      grade: "9th Grade",
      duration: "12 weeks", 
      lessons: 36,
      students: 38,
      progress: 100,
      status: "completed",
      thumbnail: "📚",
      description: "Exploring classical literature and poetry analysis"
    }
  ];

  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set #5",
      course: "Advanced Mathematics",
      dueDate: "2024-03-25",
      submitted: 28,
      total: 35,
      status: "active"
    },
    {
      id: 2,
      title: "Physics Lab Report - Pendulum",
      course: "Physics Fundamentals", 
      dueDate: "2024-03-27",
      submitted: 15,
      total: 42,
      status: "active"
    },
    {
      id: 3,
      title: "Essay: Shakespeare Analysis",
      course: "English Literature",
      dueDate: "2024-03-20",
      submitted: 38,
      total: 38,
      status: "completed"
    }
  ];

  const resources = [
    { 
      title: "Mathematics Formula Sheet",
      type: "PDF",
      subject: "Mathematics",
      downloads: 156,
      size: "2.5 MB"
    },
    {
      title: "Physics Simulation Videos",
      type: "Video",
      subject: "Physics", 
      downloads: 89,
      size: "450 MB"
    },
    {
      title: "English Grammar Guide",
      type: "PDF",
      subject: "English",
      downloads: 234,
      size: "1.8 MB"
    }
  ];

  const liveClasses = [
    {
      id: 1,
      title: "Calculus Live Session",
      instructor: "Dr. Jane Wilson",
      subject: "Mathematics",
      time: "2024-03-20 10:00 AM",
      duration: "60 minutes",
      students: 35,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Physics Problem Solving",
      instructor: "Prof. David Anderson", 
      subject: "Physics",
      time: "2024-03-21 02:00 PM",
      duration: "45 minutes",
      students: 42,
      status: "upcoming"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'default';
      case 'completed': return 'secondary';
      case 'upcoming': return 'outline';
      case 'active': return 'destructive';
      default: return 'default';
    }
  };

  const handleCreateCourse = () => {
    toast({
      title: "Course Created",
      description: "New e-learning course has been created successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">E-Learning Platform</h1>
          <p className="text-muted-foreground">Digital learning courses, assignments, and resources</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Set up a new e-learning course for students</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="course-title" className="text-sm font-medium">Course Title</label>
                <Input id="course-title" placeholder="Advanced Mathematics" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-medium">Grade Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th">9th Grade</SelectItem>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">Duration (weeks)</label>
                <Input id="duration" type="number" placeholder="8" />
              </div>
              <div className="col-span-2 space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea 
                  id="description" 
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Course description..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleCreateCourse}>Create Course</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
            <p className="text-xs text-muted-foreground">Enrolled learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">Average completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Learning materials</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="live-classes">Live Classes</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Courses</CardTitle>
              <CardDescription>Manage digital courses and track student progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="text-2xl mb-2">{course.thumbnail}</div>
                          <Badge variant={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {course.instructor.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{course.instructor}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Duration:</span>
                              <div className="font-medium">{course.duration}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Lessons:</span>
                              <div className="font-medium">{course.lessons}</div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} />
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Play className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Assignments</CardTitle>
              <CardDescription>Track and manage student assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="text-center mr-4">
                      <div className="text-lg font-bold">
                        {assignment.submitted}/{assignment.total}
                      </div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Live Classes
              </CardTitle>
              <CardDescription>Schedule and conduct live interactive sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveClasses.map((liveClass) => (
                  <div key={liveClass.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{liveClass.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Instructor: {liveClass.instructor}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {liveClass.time}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {liveClass.students} students
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(liveClass.status)}>
                        {liveClass.status}
                      </Badge>
                      <Button size="sm">
                        {liveClass.status === 'upcoming' ? 'Start Class' : 'Join'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Live Class
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Digital resources and materials for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search resources..." className="pl-8 w-64" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Resource
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="text-2xl">
                            {resource.type === 'PDF' ? '📄' : 
                             resource.type === 'Video' ? '🎥' : '📁'}
                          </div>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subject:</span>
                            <span>{resource.subject}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Downloads:</span>
                            <span>{resource.downloads}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Size:</span>
                            <span>{resource.size}</span>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ELearning;
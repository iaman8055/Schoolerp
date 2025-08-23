import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Search, Bell, Calendar as CalendarIcon, Eye, Edit, Trash2, Send, Users } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const Notices = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const notices = [
    {
      id: 1,
      title: "Mid-Term Examination Schedule Released",
      content: "The mid-term examination schedule for all grades has been published. Students are advised to check their individual schedules and prepare accordingly. The exams will commence from March 25th, 2024.",
      author: "Academic Office",
      category: "Academic",
      priority: "High",
      targetAudience: ["Students", "Parents", "Teachers"],
      publishDate: "2024-03-16",
      expiryDate: "2024-03-30",
      status: "Published",
      views: 245,
      isUrgent: true
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting - March 22nd",
      content: "Individual parent-teacher meetings are scheduled for March 22nd, 2024. Parents can book their preferred time slots through the parent portal. Duration: 15 minutes per meeting.",
      author: "Principal Office",
      category: "Meeting",
      priority: "Medium",
      targetAudience: ["Parents", "Teachers"],
      publishDate: "2024-03-15",
      expiryDate: "2024-03-22",
      status: "Published",
      views: 189,
      isUrgent: false
    },
    {
      id: 3,
      title: "Annual Sports Day - March 30th",
      content: "Our annual sports day will be conducted on March 30th, 2024, at the school ground. All students are expected to participate. Parents are invited to attend and cheer for their children.",
      author: "Sports Department",
      category: "Event",
      priority: "Medium",
      targetAudience: ["Students", "Parents", "Staff"],
      publishDate: "2024-03-14",
      expiryDate: "2024-03-31",
      status: "Published", 
      views: 156,
      isUrgent: false
    },
    {
      id: 4,
      title: "Library Book Return Reminder",
      content: "Students who have borrowed books from the library are reminded to return them by March 20th to avoid late fees. Check your library account for due dates.",
      author: "Library Department",
      category: "Library",
      priority: "Low",
      targetAudience: ["Students"],
      publishDate: "2024-03-13",
      expiryDate: "2024-03-20",
      status: "Published",
      views: 98,
      isUrgent: false
    },
    {
      id: 5,
      title: "School Closure - Public Holiday",
      content: "The school will remain closed on March 25th due to a public holiday. Regular classes will resume on March 26th, 2024.",
      author: "Administration",
      category: "Holiday",
      priority: "High",
      targetAudience: ["Students", "Parents", "Staff"],
      publishDate: "2024-03-12",
      expiryDate: "2024-03-26",
      status: "Draft",
      views: 0,
      isUrgent: true
    }
  ];

  const categories = [
    { name: "Academic", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Event", count: 8, color: "bg-green-100 text-green-800" },
    { name: "Meeting", count: 5, color: "bg-purple-100 text-purple-800" },
    { name: "Holiday", count: 3, color: "bg-orange-100 text-orange-800" },
    { name: "Library", count: 4, color: "bg-pink-100 text-pink-800" },
    { name: "General", count: 15, color: "bg-gray-100 text-gray-800" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'default';
      case 'Draft': return 'secondary';
      case 'Expired': return 'outline';
      default: return 'outline';
    }
  };

  const handleCreateNotice = () => {
    toast({
      title: "Notice Created",
      description: "New notice has been created and saved as draft.",
    });
  };

  const handlePublishNotice = (id: number) => {
    toast({
      title: "Notice Published",
      description: "Notice has been published and sent to target audience.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notice Board</h1>
          <p className="text-muted-foreground">Create, manage and publish school notices and announcements</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
              <DialogDescription>Create a new notice or announcement for the school community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notice-title">Notice Title</Label>
                <Input id="notice-title" placeholder="Enter notice title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notice-content">Content</Label>
                <Textarea 
                  id="notice-content" 
                  placeholder="Enter notice content..." 
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Students</Button>
                  <Button variant="outline" size="sm">Parents</Button>
                  <Button variant="outline" size="sm">Teachers</Button>
                  <Button variant="outline" size="sm">Staff</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Publish Date</Label>
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
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Pick expiry date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="urgent" />
                <Label htmlFor="urgent">Mark as Urgent</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="send-notification" defaultChecked />
                <Label htmlFor="send-notification">Send Push Notification</Label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleCreateNotice}>
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notices</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notices.length}</div>
            <p className="text-xs text-muted-foreground">All time notices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.filter(n => n.status === 'Published').length}
            </div>
            <p className="text-xs text-muted-foreground">Active notices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.filter(n => n.status === 'Draft').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending publication</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.reduce((sum, n) => sum + n.views, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All notices combined</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notices">All Notices</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="notices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notice Management</CardTitle>
              <CardDescription>View and manage all school notices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search notices..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name.toLowerCase()} value={cat.name.toLowerCase()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {notices.map((notice) => (
                    <Card key={notice.id} className={`${notice.isUrgent ? 'border-destructive' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{notice.title}</CardTitle>
                              {notice.isUrgent && <Badge variant="destructive" className="text-xs">URGENT</Badge>}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={getPriorityColor(notice.priority)}>
                                {notice.priority}
                              </Badge>
                              <Badge variant="outline">{notice.category}</Badge>
                              <Badge variant={getStatusColor(notice.status)}>
                                {notice.status}
                              </Badge>
                            </div>
                            <CardDescription className="line-clamp-2">
                              {notice.content}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-muted-foreground">Author: </span>
                              <span className="font-medium">{notice.author}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Published: </span>
                              <span>{notice.publishDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{notice.targetAudience.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>{notice.views} views</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {notice.status === 'Draft' && (
                              <Button 
                                size="sm" 
                                onClick={() => handlePublishNotice(notice.id)}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Publish
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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

        <TabsContent value="published" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Published Notices</CardTitle>
              <CardDescription>Currently active and visible notices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notices
                  .filter(notice => notice.status === 'Published')
                  .map((notice) => (
                    <div key={notice.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{notice.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notice.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{notice.category}</Badge>
                            <span className="text-xs text-muted-foreground">{notice.views} views</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Unpublish</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Draft Notices</CardTitle>
              <CardDescription>Unpublished notices pending review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notices
                  .filter(notice => notice.status === 'Draft')
                  .map((notice) => (
                    <div key={notice.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{notice.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notice.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{notice.category}</Badge>
                            <Badge variant={getPriorityColor(notice.priority)}>
                              {notice.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Publish
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notice Categories</CardTitle>
              <CardDescription>Manage and organize notice categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.name}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Notices:</span>
                          <span className="text-sm font-medium">{category.count}</span>
                        </div>
                        <Badge className={category.color}>{category.name}</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        View All
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notices;
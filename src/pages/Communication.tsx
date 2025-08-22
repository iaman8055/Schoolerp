import { useState } from "react";
import { Send, MessageSquare, Bell, Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function Communication() {
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const { toast } = useToast();

  const notifications = [
    { id: '1', title: 'Parent-Teacher Meeting', message: 'Scheduled for next Friday', type: 'event', date: '2024-03-08' },
    { id: '2', title: 'Fee Reminder', message: 'Monthly fees due on 15th', type: 'fee', date: '2024-03-07' },
    { id: '3', title: 'Holiday Notice', message: 'School closed on Monday', type: 'holiday', date: '2024-03-06' },
  ];

  const messages = [
    { id: '1', from: 'John Smith (Parent)', message: 'Inquiry about homework', time: '10:30 AM', status: 'unread' },
    { id: '2', from: 'Sarah Johnson (Parent)', message: 'Request for leave application', time: '09:15 AM', status: 'read' },
    { id: '3', from: 'Dr. Jane Wilson (Teacher)', message: 'Student progress update', time: '08:45 AM', status: 'replied' },
  ];

  const recipientTypes = [
    { id: 'all-parents', label: 'All Parents', count: 1247 },
    { id: 'all-teachers', label: 'All Teachers', count: 89 },
    { id: 'all-students', label: 'All Students', count: 1247 },
    { id: 'class-10a', label: 'Class 10A Parents', count: 35 },
    { id: 'math-teachers', label: 'Math Teachers', count: 12 },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedRecipients.length} recipient groups.`,
    });
    setMessage("");
    setSelectedRecipients([]);
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: "Notification has been sent to selected recipients.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Communication Center</h1>
          <p className="text-muted-foreground">Manage notifications, messages, and communications</p>
        </div>
        <Button onClick={handleSendNotification}>
          <Bell className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 inline mr-1" />
              8 unread
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Notifications Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">156</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Email Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">89</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div>
                <Label>Recipients</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {recipientTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type.id}
                        checked={selectedRecipients.includes(type.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRecipients([...selectedRecipients, type.id]);
                          } else {
                            setSelectedRecipients(selectedRecipients.filter(id => id !== type.id));
                          }
                        }}
                      />
                      <Label htmlFor={type.id} className="text-sm">
                        {type.label} ({type.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Send via" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSendMessage} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inbox">
          <Card>
            <CardHeader>
              <CardTitle>Message Inbox</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        msg.status === 'unread' ? 'bg-primary' : 'bg-muted'
                      }`} />
                      <div>
                        <h4 className="font-medium">{msg.from}</h4>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{msg.time}</span>
                      <Badge 
                        variant={
                          msg.status === 'unread' ? 'default' :
                          msg.status === 'replied' ? 'secondary' : 'outline'
                        }
                      >
                        {msg.status}
                      </Badge>
                      <Button variant="outline" size="sm">Reply</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Bell className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{notification.date}</span>
                      <Badge variant="outline">{notification.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Message Templates</h3>
                <p className="text-muted-foreground">Create and manage reusable message templates</p>
                <Button className="mt-4">Create Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
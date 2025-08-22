import { useState } from "react";
import { BookOpen, Search, Plus, Calendar, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const { toast } = useToast();

  const books = [
    { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', category: 'Fiction', status: 'Available', copies: 5 },
    { id: '2', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Fiction', status: 'Borrowed', copies: 3 },
    { id: '3', title: 'Physics Fundamentals', author: 'Dr. Smith', isbn: '978-1234567890', category: 'Science', status: 'Available', copies: 8 },
    { id: '4', title: 'Advanced Mathematics', author: 'Prof. Johnson', isbn: '978-0987654321', category: 'Mathematics', status: 'Reserved', copies: 4 },
  ];

  const borrowedBooks = [
    { id: '1', student: 'John Smith', book: 'The Great Gatsby', dueDate: '2024-03-15', status: 'Active' },
    { id: '2', student: 'Emma Johnson', book: 'Physics Fundamentals', dueDate: '2024-03-10', status: 'Overdue' },
    { id: '3', student: 'Michael Brown', book: 'History of Science', dueDate: '2024-03-20', status: 'Active' },
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const totalBooks = books.reduce((acc, book) => acc + book.copies, 0);
  const availableBooks = books.filter(book => book.status === 'Available').reduce((acc, book) => acc + book.copies, 0);
  const borrowedCount = borrowedBooks.filter(b => b.status === 'Active').length;
  const overdueCount = borrowedBooks.filter(b => b.status === 'Overdue').length;

  const handleAddBook = () => {
    toast({
      title: "Book Added",
      description: "New book has been added to the library catalog.",
    });
    setIsAddBookOpen(false);
  };

  const handleBorrowBook = (bookId: string) => {
    toast({
      title: "Book Borrowed",
      description: "Book has been successfully issued to student.",
    });
  };

  const handleReturnBook = (borrowId: string) => {
    toast({
      title: "Book Returned",
      description: "Book has been successfully returned to library.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Library Management</h1>
          <p className="text-muted-foreground">Manage books, borrowing, and library resources</p>
        </div>
        <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter book title" />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder="Enter author name" />
              </div>
              <div>
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" placeholder="Enter ISBN" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="copies">Copies</Label>
                  <Input id="copies" type="number" placeholder="Number of copies" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBook}>Add Book</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">{books.length} unique titles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableBooks}</div>
            <p className="text-xs text-muted-foreground">Ready to borrow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{borrowedCount}</div>
            <p className="text-xs text-muted-foreground">Currently issued</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
          <TabsTrigger value="members">Library Members</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <Card>
            <CardHeader>
              <CardTitle>Book Catalog</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search books by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>{book.copies}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            book.status === 'Available' ? 'default' :
                            book.status === 'Borrowed' ? 'secondary' : 'outline'
                          }
                        >
                          {book.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleBorrowBook(book.id)}
                            disabled={book.status !== 'Available'}
                          >
                            Borrow
                          </Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrowed">
          <Card>
            <CardHeader>
              <CardTitle>Borrowed Books</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowedBooks.map((borrow) => (
                    <TableRow key={borrow.id}>
                      <TableCell className="font-medium">{borrow.student}</TableCell>
                      <TableCell>{borrow.book}</TableCell>
                      <TableCell>{borrow.dueDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={borrow.status === 'Overdue' ? 'destructive' : 'default'}
                        >
                          {borrow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReturnBook(borrow.id)}
                          >
                            Return
                          </Button>
                          <Button variant="outline" size="sm">Extend</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Library Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Library Membership</h3>
                <p className="text-muted-foreground">Manage library member accounts and privileges</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Library Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <BookOpen className="w-6 h-6 mb-2" />
                  Catalog Report
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  Borrowing Report
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <AlertCircle className="w-6 h-6 mb-2" />
                  Overdue Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
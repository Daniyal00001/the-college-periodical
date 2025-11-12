"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  CheckCircle,
  XCircle,
  UserPlus,
  BookOpen,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Submission = {
  id: number;
  title: string;
  author_name: string;
  author_email: string;
  category: string;
  submitted_at: string;
  assignment_status: string;
  excerpt: string;
  content: string;
};

type Reviewer = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Assignment = {
  id: number;
  submission_id: number;
  title: string;
  category: string;
  reviewer_name: string;
  reviewer_remarks: string;
  reviewer_status: string;
  assigned_at: string;
  assignment_status: string;
};

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Submission | null>(
    null
  );
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [publishedCount, setPublishedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(userData);
    if (parsed.role !== "super_admin") {
      router.push("/admin/reviewer");
      return;
    }

    setUser(parsed);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subsRes, reviewersRes, assignmentsRes, statsRes] =
        await Promise.all([
          fetch("/api/admin/super/submissions"),
          fetch("/api/admin/super/reviewers"),
          fetch("/api/admin/super/assignments"),
          fetch("/api/admin/super/stats"),
        ]);

      if (subsRes.ok) setSubmissions(await subsRes.json());
      if (reviewersRes.ok) setReviewers(await reviewersRes.json());
      if (assignmentsRes.ok) setAssignments(await assignmentsRes.json());
      if (statsRes.ok) {
        const stats = await statsRes.json();
        setPublishedCount(stats.publishedCount);
        setRejectedCount(stats.rejectedCount);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAssign = async (submissionId: number) => {
    if (!selectedReviewer) {
      alert("Please select a reviewer");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/super/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          reviewerId: parseInt(selectedReviewer),
          assignedBy: user.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to assign");

      alert("Article assigned successfully!");
      setSelectedReviewer("");
      fetchData();
    } catch (error) {
      alert("Failed to assign article");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalDecision = async (
    submissionId: number,
    decision: "approved" | "rejected"
  ) => {
    if (
      !confirm(
        `Are you sure you want to ${
          decision === "approved" ? "approve" : "reject"
        } this article?`
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/super/final-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, decision }),
      });

      if (!res.ok) throw new Error("Failed");

      alert(`Article ${decision}!`);
      fetchData();
    } catch (error) {
      alert("Failed to process decision");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const unassignedArticles = submissions.filter(
    (s) => s.assignment_status === "unassigned"
  );
  const assignedArticles = submissions.filter(
    (s) => s.assignment_status === "assigned"
  );
  const reviewedArticles = assignments.filter(
    (a) => a.reviewer_status === "reviewed"
  );
  const approvedArticles = submissions.filter(
    (s) => s.assignment_status === "approved"
  );
  const rejectedArticles = submissions.filter(
    (s) => s.assignment_status === "rejected"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo */}
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />

              {/* Title + Subtitle */}
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Super Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Welcome, {user?.name}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Unassigned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {unassignedArticles.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Assigned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {assignedArticles.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Reviewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {reviewedArticles.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {publishedCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {rejectedCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="unassigned" className="space-y-6">
          <TabsList>
            <TabsTrigger value="unassigned">
              Unassigned ({unassignedArticles.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Reviewed ({reviewedArticles.length})
            </TabsTrigger>
            {/* <TabsTrigger value="approved">
              Approved ({approvedArticles.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedArticles.length})
            </TabsTrigger> */}
            <TabsTrigger value="reviewers">
              Reviewers ({reviewers.length})
            </TabsTrigger>
          </TabsList>

          {/* Unassigned Articles */}
          <TabsContent value="unassigned">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Articles</CardTitle>
                <CardDescription>
                  Assign these articles to reviewers
                </CardDescription>
              </CardHeader>
              <CardContent>
             <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Title</TableHead>
      <TableHead>Author</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Tracking #</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Submitted</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {unassignedArticles.map((article) => (
      <TableRow key={article.id}>
        <TableCell className="font-medium">
          {article.title}
        </TableCell>

        <TableCell>
          {article.author_name}
        </TableCell>

        <TableCell>
          {article.author_email}
        </TableCell>

        <TableCell className="font-mono text-sm">
          {article.tracking_number}
        </TableCell>

        <TableCell>
          <Badge variant="outline">{article.category}</Badge>
        </TableCell>

        <TableCell>
          {new Date(article.submitted_at).toLocaleDateString()}
        </TableCell>

        <TableCell>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedArticle(article)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedArticle?.title}</DialogTitle>
                  <DialogDescription>
                    By {selectedArticle?.author_name} (
                    {selectedArticle?.author_email})<br />
                    Tracking #: {selectedArticle?.tracking_number}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Excerpt</h4>
                    <p className="text-gray-600">{selectedArticle?.excerpt}</p>
                  </div>

                <div>
  <h4 className="font-semibold mb-2">Full Content</h4>
  <div
    className="bg-gray-50 p-4 rounded-lg prose max-w-none"
    dangerouslySetInnerHTML={{
      __html: selectedArticle?.content || "",
    }}
  />
</div>


                  <div className="space-y-2">
                    <h4 className="font-semibold">Assign to Reviewer</h4>
                    <Select
                      value={selectedReviewer}
                      onValueChange={setSelectedReviewer}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        {reviewers.map((r) => (
                          <SelectItem key={r.id} value={r.id.toString()}>
                            {r.name} ({r.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => handleAssign(selectedArticle!.id)}
                      disabled={isLoading || !selectedReviewer}
                      className="w-full"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Article
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviewed Articles */}``
 <TabsContent value="reviewed">
  <Card>
    <CardHeader>
      <CardTitle>Reviewed Articles</CardTitle>
      <CardDescription>
        Articles reviewed by reviewers - Make final decision
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>          {/* NEW */}
            <TableHead>Email</TableHead>           {/* NEW */}
            <TableHead>Tracking #</TableHead>      {/* NEW */}
            <TableHead>Reviewer</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

     <TableBody>
  {reviewedArticles.map((assignment) => (
    <TableRow key={assignment.id}>
      
      {/* TITLE */}
      <TableCell className="max-w-[180px] truncate">
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer hover:underline">
              {assignment.title}
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Full Title</DialogTitle>
            </DialogHeader>
            <p className="whitespace-pre-wrap">{assignment.title}</p>
          </DialogContent>
        </Dialog>
      </TableCell>

      {/* AUTHOR NAME */}
      <TableCell className="max-w-[160px] truncate">
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer hover:underline">
              {assignment.author_name}
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Author Name</DialogTitle>
            </DialogHeader>
            <p className="whitespace-pre-wrap">{assignment.author_name}</p>
          </DialogContent>
        </Dialog>
      </TableCell>

      {/* AUTHOR EMAIL */}
      <TableCell className="max-w-[200px] truncate">
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer hover:underline">
              {assignment.author_email}
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Author Email</DialogTitle>
            </DialogHeader>
            <p className="whitespace-pre-wrap">{assignment.author_email}</p>
          </DialogContent>
        </Dialog>
      </TableCell>

      {/* TRACKING NUMBER */}
      <TableCell className="max-w-[130px] truncate font-mono">
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer hover:underline">
              {assignment.tracking_number}
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tracking Number</DialogTitle>
            </DialogHeader>
            <p className="whitespace-pre-wrap">{assignment.tracking_number}</p>
          </DialogContent>
        </Dialog>
      </TableCell>

      {/* REVIEWER NAME */}
      <TableCell className="max-w-[160px] truncate">
        {assignment.reviewer_name}
      </TableCell>

      {/* REVIEWER REMARKS - Already Dialog */}
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="max-w-[220px] truncate text-left justify-start"
            >
              {assignment.reviewer_remarks}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Reviewer Remarks</DialogTitle>
              <DialogDescription>
                Article: {assignment.title}
              </DialogDescription>
            </DialogHeader>
            <div className="bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
              <p className="whitespace-pre-wrap">{assignment.reviewer_remarks}</p>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>

      {/* STATUS */}
      <TableCell>
        {assignment.assignment_status === "approved" ? (
          <Badge className="bg-green-100 text-green-800">Approved</Badge>
        ) : assignment.assignment_status === "rejected" ? (
          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
        )}
      </TableCell>

      {/* ACTIONS (No Change) */}
      <TableCell>
        <div className="flex gap-2">
          {assignment.assignment_status !== "approved" &&
            assignment.assignment_status !== "rejected" && (
              <>
                <Button
                  size="sm"
                  onClick={() =>
                    handleFinalDecision(assignment.submission_id, "approved")
                  }
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    handleFinalDecision(assignment.submission_id, "rejected")
                  }
                  disabled={isLoading}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </>
            )}

          {(assignment.assignment_status === "approved" ||
            assignment.assignment_status === "rejected") && (
            <span className="text-sm text-gray-500">Decision made</span>
          )}
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>

      {reviewedArticles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No reviewed articles yet
        </div>
      )}
    </CardContent>
  </Card>
</TabsContent>


          {/* Reviewers List */}``
          <TabsContent value="reviewers">
            <Card>
              <CardHeader>
                <CardTitle>Reviewers</CardTitle>
                <CardDescription>All registered reviewers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviewers.map((reviewer) => (
                      <TableRow key={reviewer.id}>
                        <TableCell className="font-medium">
                          {reviewer.name}
                        </TableCell>
                        <TableCell>{reviewer.email}</TableCell>
                        <TableCell>
                          <Badge>{reviewer.role}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

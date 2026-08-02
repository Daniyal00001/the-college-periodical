"use client";

import NavbarHeader from "@/components/NavbarHeader";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  CheckCircle,
  XCircle,
  UserPlus,
  BookOpen,
  LogOut,
  ShieldCheck,
  UserCheck,
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
import Link from "next/link";

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
  tracking_number?: string;
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
  author_name?: string;
  author_email?: string;
  tracking_number?: string;
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
    async function initSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        if (!data.user) {
          router.push("/login");
          return;
        }

        if (data.user.role !== "super_admin") {
          router.push("/admin/reviewer");
          return;
        }

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        fetchData();
      } catch (error) {
        console.error("Session error:", error);
        router.push("/login");
      }
    }

    initSession();
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

      if (subsRes.status === 401 || subsRes.status === 403) {
        handleLogout();
        return;
      }

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

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ==================== STANDARDIZED HEADER NAVBAR ==================== */}
      <NavbarHeader
        subtitle="Super Admin Editorial Portal"
        user={user}
        onLogout={handleLogout}
      />

      {/* ==================== DASHBOARD CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Minimal Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Unassigned
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-amber-600">
                {unassignedArticles.length}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Assigned
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-blue-600">
                {assignedArticles.length}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Reviewed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-indigo-600">
                {reviewedArticles.length}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-emerald-600">
                {publishedCount}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all col-span-2 sm:col-span-1">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-rose-600">
                {rejectedCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Minimal Tabs */}
        <Tabs defaultValue="unassigned" className="space-y-6">
          <div className="overflow-x-auto pb-1">
            <TabsList className="inline-flex h-auto p-1 bg-slate-200/60 rounded-xl space-x-1">
              <TabsTrigger value="unassigned" className="rounded-lg text-xs font-bold py-2.5 px-4 text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 shadow-none">
                Unassigned ({unassignedArticles.length})
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="rounded-lg text-xs font-bold py-2.5 px-4 text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 shadow-none">
                Reviewed ({reviewedArticles.length})
              </TabsTrigger>
              <TabsTrigger value="reviewers" className="rounded-lg text-xs font-bold py-2.5 px-4 text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 shadow-none">
                Reviewers ({reviewers.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Unassigned Articles */}
          <TabsContent value="unassigned">
            <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <CardTitle className="text-base font-bold text-slate-900">Unassigned Articles</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Assign pending manuscript submissions to editorial reviewers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <Table className="min-w-[750px]">
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="border-slate-100">
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Author</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tracking #</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {unassignedArticles.map((article) => (
                        <TableRow key={article.id} className="border-slate-100 hover:bg-blue-50/30 transition-colors">
                          <TableCell className="font-semibold text-slate-900 max-w-[200px] truncate">
                            {article.title}
                          </TableCell>

                          <TableCell className="text-slate-700 text-xs">{article.author_name}</TableCell>

                          <TableCell className="text-slate-500 text-xs">{article.author_email}</TableCell>

                          <TableCell className="font-mono text-xs text-blue-600 font-semibold">
                            {article.tracking_number}
                          </TableCell>

                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[11px] font-semibold">
                              {article.category}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-slate-500 text-xs">
                            {new Date(article.submitted_at).toLocaleDateString()}
                          </TableCell>

                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedArticle(article)}
                                  className="rounded-xl border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold"
                                >
                                  <Eye className="h-4 w-4 mr-1.5" />
                                  Inspect
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
                                <DialogHeader className="space-y-2 border-b border-slate-100 pb-4">
                                  <DialogTitle className="text-xl font-extrabold text-slate-900">
                                    {selectedArticle?.title}
                                  </DialogTitle>
                                  <DialogDescription className="text-xs text-slate-500">
                                    Submitted by <strong className="text-slate-700">{selectedArticle?.author_name}</strong> ({selectedArticle?.author_email}) · Tracking: <span className="font-mono text-blue-600 font-bold">{selectedArticle?.tracking_number}</span>
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-5 pt-4">
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Abstract / Excerpt</h4>
                                    <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">{selectedArticle?.excerpt}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Manuscript</h4>
                                    <div
                                      className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 prose max-w-none text-sm text-slate-700 leading-relaxed"
                                      dangerouslySetInnerHTML={{
                                        __html: selectedArticle?.content || "",
                                      }}
                                    />
                                  </div>

                                  <div className="space-y-3 pt-3 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-900">Assign to Peer Reviewer</h4>
                                    <Select
                                      value={selectedReviewer}
                                      onValueChange={setSelectedReviewer}
                                    >
                                      <SelectTrigger className="rounded-xl border-slate-200">
                                        <SelectValue placeholder="Select peer reviewer..." />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-xl">
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
                                      className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
                                    >
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Confirm Assignment
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviewed Articles */}
          <TabsContent value="reviewed">
            <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <CardTitle className="text-base font-bold text-slate-900">Reviewed Articles</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Articles evaluated by reviewers — Issue final editorial decision
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <Table className="min-w-[850px]">
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="border-slate-100">
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Author</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reviewer</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Remarks</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Decision</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {reviewedArticles.map((assignment) => (
                        <TableRow key={assignment.id} className="border-slate-100 hover:bg-slate-50/40 transition-colors">
                          <TableCell className="max-w-[180px] truncate font-semibold text-slate-900">
                            {assignment.title}
                          </TableCell>

                          <TableCell className="max-w-[160px] truncate text-xs text-slate-700">
                            {assignment.author_name}
                          </TableCell>

                          <TableCell className="max-w-[180px] truncate text-xs text-slate-500">
                            {assignment.author_email}
                          </TableCell>

                          <TableCell className="max-w-[150px] truncate text-xs font-medium text-slate-700">
                            {assignment.reviewer_name}
                          </TableCell>

                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="max-w-[180px] truncate text-left justify-start text-xs text-blue-600 hover:bg-blue-50 font-medium"
                                >
                                  {assignment.reviewer_remarks}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-h-[80vh] overflow-y-auto rounded-3xl p-6">
                                <DialogHeader>
                                  <DialogTitle className="text-lg font-bold text-slate-900">Reviewer Feedback</DialogTitle>
                                  <DialogDescription className="text-xs text-slate-500">
                                    Article: {assignment.title}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-sm text-slate-700 leading-relaxed mt-2">
                                  <p className="whitespace-pre-wrap">{assignment.reviewer_remarks}</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>

                          <TableCell>
                            {assignment.assignment_status === "approved" ? (
                              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">Approved</Badge>
                            ) : assignment.assignment_status === "rejected" ? (
                              <Badge className="bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold">Rejected</Badge>
                            ) : (
                              <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">Pending</Badge>
                            )}
                          </TableCell>

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
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold px-3"
                                      disabled={isLoading}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" /> Publish
                                    </Button>

                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() =>
                                        handleFinalDecision(assignment.submission_id, "rejected")
                                      }
                                      disabled={isLoading}
                                      className="rounded-xl text-xs font-semibold px-3"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" /> Reject
                                    </Button>
                                  </>
                                )}

                              {(assignment.assignment_status === "approved" ||
                                assignment.assignment_status === "rejected") && (
                                <span className="text-xs text-slate-400 font-medium">Finalized</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {reviewedArticles.length === 0 && (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    No reviewed articles currently awaiting final decision
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviewers List */}
          <TabsContent value="reviewers">
            <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <CardTitle className="text-base font-bold text-slate-900">Reviewers Directory</CardTitle>
                <CardDescription className="text-xs text-slate-500">All active registered peer reviewers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <Table className="min-w-[500px]">
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="border-slate-100">
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</TableHead>
                        <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reviewers.map((reviewer) => (
                        <TableRow key={reviewer.id} className="border-slate-100">
                          <TableCell className="font-semibold text-slate-900 text-sm">
                            {reviewer.name}
                          </TableCell>
                          <TableCell className="text-slate-600 text-xs">{reviewer.email}</TableCell>
                          <TableCell>
                            <Badge className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] uppercase font-bold tracking-wider rounded-lg">
                              {reviewer.role}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}

import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Mail,
  Code2,
  Palette,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const deptConfig = {
  development: { icon: Code2, color: "bg-blue-50 text-blue-600" },
  marketing: { icon: BarChart3, color: "bg-green-50 text-green-600" },
  design: { icon: Palette, color: "bg-purple-50 text-purple-600" },
};

const avatarColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-violet-100 text-violet-700",
];

export default function Team() {
  const [deptFilter, setDeptFilter] = useState("all");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [inviting, setInviting] = useState(false);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.User.list(),
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date", 200),
  });

  const filtered = members.filter(
    (m) => deptFilter === "all" || m.department === deptFilter,
  );

  const getTaskCount = (email) =>
    tasks.filter((t) => t.assigned_to === email).length;
  const getCompletedCount = (email) =>
    tasks.filter((t) => t.assigned_to === email && t.status === "done").length;

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    await base44.users.inviteUser(
      inviteEmail.trim(),
      inviteRole === "admin" ? "admin" : "user",
    );
    setInviting(false);
    setInviteEmail("");
    setInviteOpen(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {members.length} team members
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depts</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setInviteOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" /> Invite
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center py-12">
            No team members found
          </p>
        ) : (
          filtered.map((member, idx) => {
            const initials = member.full_name
              ? member.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "?";
            const dept = deptConfig[member.department];
            const taskCount = getTaskCount(member.email);
            const doneCount = getCompletedCount(member.email);

            return (
              <Card
                key={member.id}
                className="p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    className={`w-11 h-11 ${avatarColors[idx % avatarColors.length]}`}
                  >
                    <AvatarFallback
                      className={avatarColors[idx % avatarColors.length]}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {member.full_name || "—"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {member.job_title || member.role || "Member"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {dept && (
                        <Badge
                          className={`${dept.color} text-[10px] capitalize`}
                        >
                          {member.department}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[10px]">
                        {member.role || "member"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {taskCount}
                      </p>
                      <p className="text-[10px] text-gray-400">Tasks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-emerald-600">
                        {doneCount}
                      </p>
                      <p className="text-[10px] text-gray-400">Done</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              disabled={inviting || !inviteEmail.trim()}
            >
              {inviting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

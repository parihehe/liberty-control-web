
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import StaffTable from "@/components/staff/StaffTable";
import StaffForm from "@/components/staff/StaffForm";
import { Staff } from "@/types";

const StaffPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(undefined);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: "1",
      employee_id: "E1001",
      first_name: "James",
      last_name: "Carter",
      position: "Warden",
      department: "Administration",
      contact: "james.carter@prisonms.com",
      shift: "morning"
    },
    {
      id: "2",
      employee_id: "E1002",
      first_name: "Sarah",
      last_name: "Johnson",
      position: "Security Officer",
      department: "Security",
      contact: "sarah.johnson@prisonms.com",
      shift: "night"
    },
    {
      id: "3",
      employee_id: "E1003",
      first_name: "David",
      last_name: "Miller",
      position: "Medical Officer",
      department: "Medical",
      contact: "david.miller@prisonms.com",
      shift: "evening"
    },
    {
      id: "4",
      employee_id: "E1004",
      first_name: "Emily",
      last_name: "Wilson",
      position: "Counselor",
      department: "Psychology",
      contact: "emily.wilson@prisonms.com",
      shift: "morning"
    }
  ]);
  
  const filteredStaff = staff.filter(person => 
    person.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    `${person.first_name} ${person.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddStaff = () => {
    setSelectedStaff(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditStaff = (person: Staff) => {
    setSelectedStaff(person);
    setIsFormOpen(true);
  };
  
  const handleDeleteStaff = (id: string) => {
    setStaffToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff(staff.filter(s => s.id !== staffToDelete));
      toast({
        title: "Staff deleted",
        description: "The staff record has been deleted successfully."
      });
    }
    setIsDeleteDialogOpen(false);
    setStaffToDelete(null);
  };
  
  const handleFormSubmit = (data: Staff) => {
    if (selectedStaff) {
      // Update existing staff
      setStaff(staff.map(s => s.id === data.id ? data : s));
      toast({
        title: "Staff updated",
        description: "The staff record has been updated successfully."
      });
    } else {
      // Add new staff
      setStaff([...staff, data]);
      toast({
        title: "Staff added",
        description: "The staff record has been added successfully."
      });
    }
    setIsFormOpen(false);
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Staff Management</h1>
        <Button onClick={handleAddStaff}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>
      
      <div className="mb-6 w-full md:w-1/3">
        <Input
          placeholder="Search by ID, name, position or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <StaffTable
        staff={filteredStaff}
        onEdit={handleEditStaff}
        onDelete={handleDeleteStaff}
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStaff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
          </DialogHeader>
          <StaffForm
            staff={selectedStaff}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this staff record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StaffPage;

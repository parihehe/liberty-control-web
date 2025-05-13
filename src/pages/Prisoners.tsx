import { useState, useEffect } from "react";
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
import PrisonerTable from "@/components/prisoners/PrisonerTable";
import PrisonerForm from "@/components/prisoners/PrisonerForm";
import { Prisoner, Cell } from "@/types";

const STORAGE_KEY = 'prison_management_prisoners';
const CELLS_STORAGE_KEY = 'prison_management_cells';

const Prisoners = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPrisoner, setSelectedPrisoner] = useState<Prisoner | undefined>(undefined);
  const [prisonerToDelete, setPrisonerToDelete] = useState<string | null>(null);
  
  // Initial mock data - now used only if there's nothing in localStorage
  const initialPrisoners: Prisoner[] = [
    {
      id: "1",
      inmate_id: "P10045",
      first_name: "John",
      last_name: "Doe",
      dob: "1985-06-15T00:00:00.000Z",
      crime: "Armed Robbery",
      sentence_start: "2020-03-10T00:00:00.000Z",
      sentence_end: "2030-03-10T00:00:00.000Z",
      status: "incarcerated",
      cell_id: "c1"
    },
    {
      id: "2",
      inmate_id: "P10046",
      first_name: "Michael",
      last_name: "Smith",
      dob: "1978-11-22T00:00:00.000Z",
      crime: "Fraud",
      sentence_start: "2019-05-20T00:00:00.000Z",
      sentence_end: "2024-05-20T00:00:00.000Z",
      status: "incarcerated",
      cell_id: "c2"
    },
    {
      id: "3",
      inmate_id: "P10047",
      first_name: "Robert",
      last_name: "Johnson",
      dob: "1990-01-05T00:00:00.000Z",
      crime: "Drug Trafficking",
      sentence_start: "2018-08-15T00:00:00.000Z",
      sentence_end: "2023-08-15T00:00:00.000Z",
      status: "parole",
      cell_id: null
    }
  ];
  
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
  const [cells, setCells] = useState<Cell[]>([]);
  
  // Load prisoners and cells from localStorage on initial render
  useEffect(() => {
    // Load prisoners data
    const savedPrisoners = localStorage.getItem(STORAGE_KEY);
    if (savedPrisoners) {
      setPrisoners(JSON.parse(savedPrisoners));
    } else {
      // If no saved data, use initial mock data
      setPrisoners(initialPrisoners);
      // Also save initial data to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPrisoners));
    }
    
    // Load cells data
    const savedCells = localStorage.getItem(CELLS_STORAGE_KEY);
    if (savedCells) {
      setCells(JSON.parse(savedCells));
    } else {
      // Default cells if none are in localStorage (this is a fallback)
      const defaultCells: Cell[] = [
        { id: "c1", cell_number: "101", block: "A", capacity: 2, occupancy: 1, security_level: "maximum" },
        { id: "c2", cell_number: "102", block: "A", capacity: 2, occupancy: 2, security_level: "maximum" },
        { id: "c3", cell_number: "201", block: "B", capacity: 1, occupancy: 0, security_level: "medium" },
        { id: "c4", cell_number: "202", block: "B", capacity: 1, occupancy: 1, security_level: "medium" },
      ];
      setCells(defaultCells);
    }
  }, []);
  
  // Save prisoners to localStorage whenever they change
  useEffect(() => {
    if (prisoners.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prisoners));
    }
  }, [prisoners]);
  
  const filteredPrisoners = prisoners.filter(prisoner => 
    prisoner.inmate_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    `${prisoner.first_name} ${prisoner.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddPrisoner = () => {
    setSelectedPrisoner(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditPrisoner = (prisoner: Prisoner) => {
    setSelectedPrisoner(prisoner);
    setIsFormOpen(true);
  };
  
  const handleDeletePrisoner = (id: string) => {
    setPrisonerToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (prisonerToDelete) {
      setPrisoners(prisoners.filter(p => p.id !== prisonerToDelete));
      toast({
        title: "Prisoner deleted",
        description: "The prisoner record has been deleted successfully."
      });
    }
    setIsDeleteDialogOpen(false);
    setPrisonerToDelete(null);
  };
  
  const handleViewPrisoner = (prisoner: Prisoner) => {
    // In a real app, this might navigate to a detail page
    toast({
      title: "View Prisoner",
      description: `Viewing details for ${prisoner.first_name} ${prisoner.last_name}`
    });
  };
  
  const handleFormSubmit = (data: Prisoner) => {
    if (selectedPrisoner) {
      // Update existing prisoner
      setPrisoners(prisoners.map(p => p.id === data.id ? data : p));
      toast({
        title: "Prisoner updated",
        description: "The prisoner record has been updated successfully."
      });
    } else {
      // Add new prisoner
      setPrisoners([...prisoners, data]);
      toast({
        title: "Prisoner added",
        description: "The prisoner has been added successfully."
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
        <h1 className="page-title">Prisoners</h1>
        <Button onClick={handleAddPrisoner}>
          <Plus className="mr-2 h-4 w-4" />
          Add Prisoner
        </Button>
      </div>
      
      <div className="mb-6 w-full md:w-1/3">
        <Input
          placeholder="Search by ID or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <PrisonerTable
        prisoners={filteredPrisoners}
        onEdit={handleEditPrisoner}
        onDelete={handleDeletePrisoner}
        onView={handleViewPrisoner}
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPrisoner ? "Edit Prisoner" : "Add New Prisoner"}</DialogTitle>
          </DialogHeader>
          <PrisonerForm
            prisoner={selectedPrisoner}
            cells={cells}
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
              This will permanently delete the prisoner record. This action cannot be undone.
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

export default Prisoners;

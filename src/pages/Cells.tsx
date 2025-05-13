
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
import CellTable from "@/components/cells/CellTable";
import CellForm from "@/components/cells/CellForm";
import { Cell } from "@/types";

const STORAGE_KEY = 'prison_management_cells';

const Cells = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined);
  const [cellToDelete, setCellToDelete] = useState<string | null>(null);
  
  // Initial mock data - now used only if there's nothing in localStorage
  const initialCells: Cell[] = [
    {
      id: "c1",
      cell_number: "101",
      block: "A",
      capacity: 2,
      occupancy: 1,
      security_level: "maximum"
    },
    {
      id: "c2",
      cell_number: "102",
      block: "A",
      capacity: 2,
      occupancy: 2,
      security_level: "maximum"
    },
    {
      id: "c3",
      cell_number: "201",
      block: "B",
      capacity: 1,
      occupancy: 0,
      security_level: "medium"
    },
    {
      id: "c4",
      cell_number: "202",
      block: "B",
      capacity: 1,
      occupancy: 1,
      security_level: "medium"
    },
    {
      id: "c5",
      cell_number: "301",
      block: "C",
      capacity: 4,
      occupancy: 2,
      security_level: "minimum"
    }
  ];
  
  const [cells, setCells] = useState<Cell[]>([]);
  
  // Load cells from localStorage on initial render
  useEffect(() => {
    const savedCells = localStorage.getItem(STORAGE_KEY);
    if (savedCells) {
      setCells(JSON.parse(savedCells));
    } else {
      // If no saved data, use initial mock data
      setCells(initialCells);
      // Also save initial data to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCells));
    }
  }, []);
  
  // Save cells to localStorage whenever they change
  useEffect(() => {
    if (cells.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cells));
    }
  }, [cells]);
  
  const filteredCells = cells.filter(cell => 
    cell.cell_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cell.block.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddCell = () => {
    setSelectedCell(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditCell = (cell: Cell) => {
    setSelectedCell(cell);
    setIsFormOpen(true);
  };
  
  const handleDeleteCell = (id: string) => {
    setCellToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (cellToDelete) {
      setCells(cells.filter(c => c.id !== cellToDelete));
      toast({
        title: "Cell deleted",
        description: "The cell has been deleted successfully."
      });
    }
    setIsDeleteDialogOpen(false);
    setCellToDelete(null);
  };
  
  const handleFormSubmit = (data: Cell) => {
    if (selectedCell) {
      // Update existing cell
      setCells(cells.map(c => c.id === data.id ? data : c));
      toast({
        title: "Cell updated",
        description: "The cell has been updated successfully."
      });
    } else {
      // Add new cell
      setCells([...cells, data]);
      toast({
        title: "Cell added",
        description: "The cell has been added successfully."
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
        <h1 className="page-title">Cells</h1>
        <Button onClick={handleAddCell}>
          <Plus className="mr-2 h-4 w-4" />
          Add Cell
        </Button>
      </div>
      
      <div className="mb-6 w-full md:w-1/3">
        <Input
          placeholder="Search by cell number or block..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <CellTable
        cells={filteredCells}
        onEdit={handleEditCell}
        onDelete={handleDeleteCell}
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCell ? "Edit Cell" : "Add New Cell"}</DialogTitle>
          </DialogHeader>
          <CellForm
            cell={selectedCell}
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
              This will permanently delete this cell. This action cannot be undone.
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

export default Cells;

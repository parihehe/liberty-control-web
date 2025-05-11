
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Cell } from "@/types";
import { Progress } from "@/components/ui/progress";

interface CellTableProps {
  cells: Cell[];
  onEdit: (cell: Cell) => void;
  onDelete: (id: string) => void;
}

const CellTable = ({ cells, onEdit, onDelete }: CellTableProps) => {
  const getSecurityLevelStyle = (level: Cell["security_level"]) => {
    switch (level) {
      case "maximum":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "minimum":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return "bg-red-600";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Cell Number</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>Security Level</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cells.map((cell) => (
            <TableRow key={cell.id}>
              <TableCell>{cell.cell_number}</TableCell>
              <TableCell>{cell.block}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityLevelStyle(cell.security_level)}`}>
                  {cell.security_level.charAt(0).toUpperCase() + cell.security_level.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-sm">{`${cell.occupancy}/${cell.capacity}`}</span>
                  <Progress 
                    value={(cell.occupancy / cell.capacity) * 100} 
                    className={`h-2 w-24 ${getOccupancyColor(cell.occupancy, cell.capacity)}`}
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(cell)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(cell.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CellTable;

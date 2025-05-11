
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Prisoner } from "@/types";

interface PrisonerTableProps {
  prisoners: Prisoner[];
  onEdit: (prisoner: Prisoner) => void;
  onDelete: (id: string) => void;
  onView: (prisoner: Prisoner) => void;
}

const PrisonerTable = ({ prisoners, onEdit, onDelete, onView }: PrisonerTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[150px]">Inmate ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Crime</TableHead>
            <TableHead>Sentence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cell</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prisoners.map((prisoner) => (
            <TableRow key={prisoner.id}>
              <TableCell className="font-medium">{prisoner.inmate_id}</TableCell>
              <TableCell>{`${prisoner.first_name} ${prisoner.last_name}`}</TableCell>
              <TableCell>{prisoner.crime}</TableCell>
              <TableCell>{`${new Date(prisoner.sentence_start).toLocaleDateString()} - ${new Date(prisoner.sentence_end).toLocaleDateString()}`}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prisoner.status)}`}>
                  {prisoner.status.charAt(0).toUpperCase() + prisoner.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{prisoner.cell_id || "Not assigned"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onView(prisoner)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEdit(prisoner)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(prisoner.id)}>
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

const getStatusColor = (status: Prisoner["status"]) => {
  switch (status) {
    case "incarcerated":
      return "bg-amber-100 text-amber-800";
    case "released":
      return "bg-green-100 text-green-800";
    case "parole":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default PrisonerTable;

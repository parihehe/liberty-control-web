
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cell } from "@/types";

interface CellFormProps {
  cell?: Cell;
  onSubmit: (data: Cell) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  id: z.string().optional(),
  cell_number: z.string().min(1, "Cell number is required"),
  block: z.string().min(1, "Block is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  occupancy: z.number().min(0, "Occupancy cannot be negative"),
  security_level: z.enum(["minimum", "medium", "maximum"]),
});

const CellForm = ({ cell, onSubmit, onCancel }: CellFormProps) => {
  const form = useForm<Cell>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      cell_number: "",
      block: "",
      capacity: 1,
      occupancy: 0,
      security_level: "medium",
    },
  });

  useEffect(() => {
    if (cell) {
      form.reset(cell);
    }
  }, [cell, form]);

  const handleSubmit = (data: Cell) => {
    onSubmit({
      ...data,
      id: cell?.id || crypto.randomUUID(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cell_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cell Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cell number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="block"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <Input placeholder="Enter block" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter capacity" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="occupancy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Occupancy</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter occupancy" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="security_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="minimum">Minimum</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="maximum">Maximum</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {cell ? "Update Cell" : "Add Cell"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CellForm;

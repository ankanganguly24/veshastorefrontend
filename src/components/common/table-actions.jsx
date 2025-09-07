import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function TableActions({ 
  onView, 
  onEdit, 
  onDelete, 
  editHref, 
  viewHref,
  deleteDisabled = false 
}) {
  return (
    <div className="flex items-center justify-end space-x-2">
      {(onView || viewHref) && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onView}
          asChild={!!viewHref}
        >
          {viewHref ? (
            <Link href={viewHref}>
              <Eye className="h-4 w-4" />
            </Link>
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      )}
      
      {(onEdit || editHref) && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onEdit}
          asChild={!!editHref}
        >
          {editHref ? (
            <Link href={editHref}>
              <Edit className="h-4 w-4" />
            </Link>
          ) : (
            <Edit className="h-4 w-4" />
          )}
        </Button>
      )}
      
      {onDelete && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-600 hover:text-red-700"
          onClick={onDelete}
          disabled={deleteDisabled}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export function TableMoreActions({ children }) {
  return (
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );
}

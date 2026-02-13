import { useEffect, useState } from "react";
import {
  getMessages,
  updateMessageReadStatus,
  deleteMessage,
} from "../../services/messages.service";
import { CheckCheck, Undo2, Trash2 } from "lucide-react";
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
import { PAGE_SIZE } from "../../services/messages.service";


export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [page]);

  async function fetchMessages() {
    const res = await getMessages(page);
    setMessages(res.data);
    setTotal(res.total);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteMessage(deleteTarget.id);
    setIsDeleteOpen(false);
    setDeleteTarget(null);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start justify-between gap-4 rounded-lg border p-4 ${
              msg.is_read ? "bg-green-50" : "bg-yellow-50"
            }`}
          >
            {/* Message Info */}
            <div className="flex-1 space-y-1">
              <p className="font-medium">{msg.email}</p>
              <p className="text-sm text-gray-700">
                {msg.message}
              </p>
              <span
                className={`text-xs font-medium ${
                  msg.is_read
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {msg.is_read ? "Read" : "Unread"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {msg.is_read ? (
                <button
                  title="Mark as unread"
                  onClick={() =>
                    updateMessageReadStatus(
                      msg.id,
                      false
                    ).then(fetchMessages)
                  }
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <Undo2 className="h-5 w-5" />
                </button>
              ) : (
                <button
                  title="Mark as read"
                  onClick={() =>
                    updateMessageReadStatus(
                      msg.id,
                      true
                    ).then(fetchMessages)
                  }
                  className="text-green-600 hover:text-green-800"
                >
                  <CheckCheck className="h-5 w-5" />
                </button>
              )}

              <button
                title="Delete message"
                onClick={() => {
                  setDeleteTarget(msg);
                  setIsDeleteOpen(true);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No messages found.
          </p>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-white border shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the message from{" "}
              <strong>{deleteTarget?.email}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

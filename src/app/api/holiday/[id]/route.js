import connectDB from "@/lib/db";
import Holiday from "@/models/Holiday";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    const updatedHoliday = await Holiday.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    if (!updatedHoliday) {
      return new Response("Holiday not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedHoliday), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating holiday:", error);
    return new Response("Failed to update holiday", { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deletedHoliday = await Holiday.findByIdAndDelete(params.id);
    if (!deletedHoliday) {
      return new Response("Holiday not found", { status: 404 });
    }
    return new Response("Holiday deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting holiday:", error);
    return new Response("Failed to delete holiday", { status: 400 });
  }
}

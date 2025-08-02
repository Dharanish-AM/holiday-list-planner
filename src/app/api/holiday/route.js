import connectDB from "../../../lib/db";
import Holiday from "../../../models/Holiday";

export const GET = async (request) => {
  try {
    await connectDB();
    const holidays = await Holiday.find({}).sort({ date: 1 });
    return new Response(JSON.stringify(holidays), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return new Response("Failed to fetch holidays", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const data = await request.json();
    const newHoliday = new Holiday(data);
    await newHoliday.save();
    return new Response(JSON.stringify(newHoliday), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating holiday:", error);
    const message = error?.message || "Failed to create holiday";
    return new Response(message, { status: 400 });
  }
};

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
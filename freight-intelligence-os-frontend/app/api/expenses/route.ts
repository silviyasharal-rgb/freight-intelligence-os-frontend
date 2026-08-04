import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// GET - அனைத்து expenses
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "expenses"));

    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

// POST - புதிய expense
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const docRef = await addDoc(collection(db, "expenses"), {
      type: body.type,
      amount: body.amount,
      date: body.date,
    });

    return NextResponse.json({
      id: docRef.id,
      message: "Expense Added",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add expense" },
      { status: 500 }
    );
  }
}
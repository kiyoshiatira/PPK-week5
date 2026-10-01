"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function createBudget(formData: FormData) {
  const amount = Number(formData.get("amount"));

  if (!amount || amount <= 0) {
    return {
      error: "Nominal budget harus lebih dari 0.",
    };
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Silakan login terlebih dahulu.",
    };
  }

  const now = new Date();
  const month = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), 1)
  )
    .toISOString()
    .split("T")[0];

  const { error } = await supabase.from("budgets").insert({
    user_id: user.id,
    month,
    amount,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        error: "Budget untuk bulan ini sudah dibuat.",
      };
    }

    return {
      error: error.message,
    };
  }

  return {
    success: "Budget berhasil disimpan.",
  };
}
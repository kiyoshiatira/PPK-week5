import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createBudget } from "./actions";

export default async function BudgetPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Silakan login terlebih dahulu.</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Budget Bulanan</h1>

      <form action={createBudget} className="space-y-4 max-w-md">
        <div>
          <label
            htmlFor="amount"
            className="block mb-2 font-medium"
          >
            Nominal Budget
          </label>

          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            placeholder="Contoh: 2000000"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          Simpan Budget
        </button>
      </form>
    </main>
  );
}
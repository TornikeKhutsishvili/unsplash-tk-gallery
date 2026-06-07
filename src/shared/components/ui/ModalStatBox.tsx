function StatBox({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

export default StatBox;
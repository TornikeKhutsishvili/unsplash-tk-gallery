import { Suspense } from "react"
import AppRoutes from "./features/routes/AppRoutes"
import { ThemeApplier } from "./shared/components/theme/ThemeApplier"

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* theme applier */}
        <ThemeApplier />

        {/* App Routes */}
        <AppRoutes />
      </Suspense>
    </>
  )
}

export default App

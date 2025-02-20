import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Link } from "lucide-react"


interface CreateWalletAccordionProps {
  isOpen: boolean
}

export default function CreateWalletAccordion({ isOpen }: CreateWalletAccordionProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4 transition-all duration-500 ease-in-out">
      <Button
        className="w-full justify-between bg-blue-700 hover:bg-blue-600 text-white"
        onClick={() => setActiveButton(activeButton === "create" ? null : "create")}
      >
        <span className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />

          {/* <Link href="/wallet"> */}
          Create Wallet
        </span>
        <span className="text-sm">{activeButton === "create" ? "▲" : "▼"}</span>
      </Button>
      {activeButton === "create" && (
        <div className="p-4 bg-blue-800 rounded-md">
          <p className="text-sm text-gray-300 mb-4">Create a new wallet to start managing your crypto assets.</p>
          <Button className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-600 mb-4" onClick={() => window.location.href = '/wallet'}>
            Create new wallet
          </Button>
              </div>
      )}

      <Button
        className="w-full justify-between bg-blue-700 hover:bg-blue-600 text-white"
        onClick={() => setActiveButton(activeButton === "connect" ? null : "connect")}
      >
        <span className="flex items-center">
          <Link className="mr-2 h-4 w-4" />
          Connect Wallet
        </span>
        <span className="text-sm">{activeButton === "connect" ? "▲" : "▼"}</span>
      </Button>
      {activeButton === "connect" && (
        <div className="p-4 bg-blue-800 rounded-md">
          <p className="text-sm text-gray-300 mb-4">Connect your existing wallet to access your assets.</p>
          <Button className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-600">Connect Existing Wallet</Button>
        </div>
      )}
    </div>
  )
}


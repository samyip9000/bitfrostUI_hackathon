"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Wallet, ArrowLeftRight, FileText, Coins, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CreateWalletAccordion from "@/components/create-wallet-accordion"
// ... existing code ...

export default function SnapScrollLanding() {
  const [activeSection, setActiveSection] = useState(0)
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observers = sectionsRef.current.map((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index)
          }
        },
        {
          threshold: 0.5,
        },
      )

      if (section) {
        observer.observe(section)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const sections = [
    {
      id: "create-wallet",
      title: "Create Wallet",
      icon: Wallet,
      description: "Create and manage your secure crypto wallet",
    },
    {
      id: "send-transaction",
      title: "Send transaction",
      icon: ArrowLeftRight,
      description: "Send and receive crypto assets seamlessly",
    },
    {
      id: "write-contract",
      title: "Write contract",
      icon: FileText,
      description: "Deploy and interact with smart contracts",
    },
    {
      id: "mint-redeem",
      title: "Mint/Redeem LST Bifrost",
      icon: Coins,
      description: "Mint and redeem your LST tokens",
    },
  ]

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Top Left Button */}
      <Button
        className="fixed top-4 left-4 z-50 bg-yellow-500 text-blue-900 hover:bg-yellow-600"
        onClick={() => console.log("Deploy Now clicked")}
      >
        Deploy Now
      </Button>

      {/* Top Right Button */}
      <Button
        className="fixed top-4 right-4 z-50 bg-gray-700 text-white hover:bg-gray-600"
        onClick={() => console.log("Docs clicked")}
      >
        Docs
      </Button>

      {/* Fixed Navigation */}
      <nav className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2">
        <div className="flex items-center space-x-4">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-300 hover:bg-gray-700",
                  activeSection === index ? "bg-yellow-500 text-blue-900" : "text-gray-400",
                )}
              >
                <Icon className="w-6 h-6" />
              </a>
            )
          })}
        </div>
      </nav>

      {/* Snap Scroll Container */}
      <div className="h-screen snap-y snap-mandatory overflow-y-auto">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => el && (sectionsRef.current[index] = el)}
            className="h-screen snap-start flex flex-col items-center justify-center relative"
          >
            {section.id === "create-wallet" ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl mx-auto px-4">
                  <Wallet className="w-16 h-16 mb-6 mx-auto text-yellow-400" />
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                    {section.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8">{section.description}</p>
                  <Button
                    size="lg"
                    className="bg-yellow-500 text-blue-900 hover:bg-yellow-600"
                    onClick={() => setIsCreateWalletOpen(!isCreateWalletOpen)}
                  >
                    {isCreateWalletOpen ? (
                      <>
                        Close
                        <X className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Get Started
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <CreateWalletAccordion isOpen={isCreateWalletOpen} />
              </div>
            ) : (
              <>
                {/* Background Elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <section.icon className="w-96 h-96" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                  <section.icon className="w-16 h-16 mb-6 mx-auto text-yellow-400" />
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                    {section.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300">{section.description}</p>
                </div>
              </>
            )}

            {/* Scroll Indicator (except for last section) */}
            {index < sections.length - 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            )}

            {/* Section Divider */}
            {index < sections.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            )}
          </section>
        ))}
      </div>
    </div>
  )
}


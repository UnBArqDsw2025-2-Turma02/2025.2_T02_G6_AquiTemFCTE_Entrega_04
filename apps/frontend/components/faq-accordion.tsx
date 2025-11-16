"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-foreground pr-4">{item.question}</span>
            <ChevronDown
              className={cn("h-5 w-5 text-muted-foreground transition-transform flex-shrink-0", {
                "rotate-180": openIndex === index,
              })}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-muted-foreground">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

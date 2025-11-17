'use client'

import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight, LucideProps } from 'lucide-react'

interface StepProps {
  title: string
  description: string
  icon: (props: LucideProps) => React.JSX.Element
  component: () => React.JSX.Element
}

interface StepperProps {
  steps: StepProps[]
  activeStep: StepProps
  activeStepIdx: number
}

const Stepper: FC<StepperProps> = ({ steps, activeStep, activeStepIdx }) => {
  return (
    <>
      <div className="lg:hidden">
        <div className="w-full flex items-center gap-6 mt-2 mb-8">
          <div className="w-full flex items-center gap-4">
            <div className="p-3 rounded-full bg-sidebar-border">
              <activeStep.icon className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-[1.25rem]">
                {activeStep.title}
              </span>
              <span className="text-[0.85rem]">{activeStep.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="w-full flex items-center gap-6 mt-2 mb-8">
          {steps.map((each, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-2',
                idx > activeStepIdx && 'opacity-45'
              )}
            >
              <div className="p-3 rounded-full bg-sidebar-border">
                <each.icon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[0.925rem]">
                  {each.title}
                </span>
                <span className="font-medium text-[0.75rem]">
                  {each.description}
                </span>
              </div>
              {idx + 1 < steps.length && (
                <ChevronRight className="size-5 ml-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Stepper

"use client"

import { Combobox } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type SearchableSelectOption = {
  value: string
  label: string
  description?: string
  keywords?: string
}

type SearchableSelectProps = {
  options: SearchableSelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  /** Compact label for embedded triggers (e.g. dial code only). */
  triggerLabel?: string
  /** Strips border/background for use inside composite inputs. */
  embedded?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

const SearchableSelect = ({
  options,
  value,
  onValueChange,
  disabled,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  triggerLabel,
  embedded = false,
  className,
  triggerClassName,
  contentClassName,
}: SearchableSelectProps) => {
  const selected = options.find((option) => option.value === value) ?? null
  const displayLabel = triggerLabel ?? selected?.label ?? placeholder

  return (
    <div className={cn(embedded && "flex h-full items-center", className)}>
      <Combobox.Root
        items={options}
        value={selected}
        onValueChange={(option) => onValueChange?.(option?.value ?? "")}
        disabled={disabled}
        autoHighlight
        itemToStringLabel={(option) =>
          [option.label, option.description, option.keywords].filter(Boolean).join(" ")
        }
      >
      <Combobox.Trigger
        data-slot="searchable-select-trigger"
        className={cn(
          "flex w-full items-center justify-between gap-1.5 text-sm whitespace-nowrap transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50",
          embedded
            ? "h-full min-h-0 border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent"
            : "rounded-lg border border-input bg-transparent px-2.5 py-2 focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50",
          triggerClassName,
        )}
      >
        <span className={cn("truncate", !selected && !triggerLabel && "text-muted-foreground")}>
          {displayLabel}
        </span>
        <ChevronDownIcon className={cn("shrink-0 text-muted-foreground", embedded ? "size-3.5" : "size-4")} />
      </Combobox.Trigger>

      <Combobox.Portal>
        <Combobox.Positioner side="bottom" sideOffset={4} align="start" className="isolate z-50">
          <Combobox.Popup
            data-slot="searchable-select-content"
            className={cn(
              "w-(--anchor-width) min-w-48 origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10",
              contentClassName,
            )}
          >
            <div className="border-b border-border/60 p-2">
              <Combobox.Input
                placeholder={searchPlaceholder}
                className="h-8 w-full rounded-md border border-input bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              />
            </div>

            <Combobox.Empty className="px-3 py-4 text-center text-sm text-muted-foreground">
              {emptyText}
            </Combobox.Empty>

            <Combobox.List className="max-h-60 overflow-y-auto p-1">
              {(option: SearchableSelectOption) => (
                <Combobox.Item
                  key={option.value}
                  value={option}
                  className="relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">{option.label}</span>
                    {option.description && (
                      <span className="truncate text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>
                  <Combobox.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
                    <CheckIcon className="size-4" />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
      </Combobox.Root>
    </div>
  )
}

export { SearchableSelect }

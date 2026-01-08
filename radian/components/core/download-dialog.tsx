"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import Image from 'next/image'

interface DownloadDialogProps {
  children: React.ReactNode
}

export function DownloadDialog({ children }: DownloadDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [usage, setUsage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !usage.trim()) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, 'downloads'), {
        name: name.trim(),
        usage: usage.trim(),
        timestamp: new Date(),
        userAgent: navigator.userAgent,
      })

      // Close dialog and redirect
      setOpen(false)
      router.push('/')
      
      // Reset form
      setName('')
      setUsage('')
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image src="/winicon.png" alt="Windows" width={24} height={24} className="invert-100 dark:invert-0" />
            Download for Windows
          </DialogTitle>
          <DialogDescription>
            Please tell us a bit about yourself before downloading our app.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="usage" className="text-sm font-medium">
              What will you use our app for?
            </label>
            <textarea
              id="usage"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              placeholder="Tell us how you plan to use our text-to-speech app..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Download'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
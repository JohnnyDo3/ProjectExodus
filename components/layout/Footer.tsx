import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-earth-900 text-sand-100 py-20 border-t-8 border-moss-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h3 className="text-5xl font-black tracking-tight" style={{
            background: 'linear-gradient(135deg, #9ccba0, #91cdcd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            PROJECT EXODUS
          </h3>
          <p className="text-sand-200 max-w-2xl mx-auto text-xl font-semibold">
            Building the world's most accessible sustainability hub. One bold step at a time.
          </p>
          <div className="flex justify-center gap-8 pt-4">
            <Link href="/products" className="text-sand-300 hover:text-moss-300 font-bold uppercase text-sm transition-colors">
              Products
            </Link>
            <Link href="/learn" className="text-sand-300 hover:text-moss-300 font-bold uppercase text-sm transition-colors">
              Learn
            </Link>
            <Link href="/community" className="text-sand-300 hover:text-moss-300 font-bold uppercase text-sm transition-colors">
              Community
            </Link>
            <Link href="/about" className="text-sand-300 hover:text-moss-300 font-bold uppercase text-sm transition-colors">
              About
            </Link>
          </div>
          <div className="pt-6 text-base text-sand-400 font-bold tracking-wide">
            IN COLLABORATION WITH SAGE AND MR. NOBODY • 2025
          </div>
        </div>
      </div>
    </footer>
  )
}

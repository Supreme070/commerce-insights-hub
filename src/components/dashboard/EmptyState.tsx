import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function EmptyState({ onConnect }: { onConnect?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
    >
      {/* Geometric SVG illustration */}
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8"
      >
        {/* Background circle */}
        <circle cx="100" cy="100" r="90" fill="hsl(210, 17%, 98%)" stroke="hsl(220, 9%, 88%)" strokeWidth="1.5" />

        {/* Shopping bag body */}
        <motion.rect
          x="60" y="75" width="80" height="85" rx="6"
          fill="none"
          stroke="hsl(214, 82%, 51%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
        />

        {/* Bag handle */}
        <motion.path
          d="M78 75 V62 C78 48 92 38 100 38 C108 38 122 48 122 62 V75"
          fill="none"
          stroke="hsl(137, 52%, 43%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease: "easeInOut" }}
        />

        {/* Decorative dots */}
        <motion.circle
          cx="85" cy="110" r="4"
          fill="hsl(214, 82%, 51%)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, duration: 0.3, type: "spring" }}
        />
        <motion.circle
          cx="100" cy="110" r="4"
          fill="hsl(137, 52%, 43%)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, duration: 0.3, type: "spring" }}
        />
        <motion.circle
          cx="115" cy="110" r="4"
          fill="hsl(43, 97%, 50%)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.3, type: "spring" }}
        />

        {/* Chart line accent */}
        <motion.polyline
          points="70,135 85,125 100,130 115,120 130,128"
          fill="none"
          stroke="hsl(214, 82%, 51%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
        />
      </motion.svg>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-google text-xl font-semibold text-foreground mb-2"
      >
        Connect your store
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-text-secondary max-w-sm mb-8 leading-relaxed"
      >
        Link your Shopify or WooCommerce store to see real-time ecommerce analytics
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          onClick={onConnect}
          className="bg-google-blue hover:bg-[hsl(214,82%,45%)] text-primary-foreground px-6 h-10 rounded font-medium text-sm shadow-level-1 hover:shadow-level-2 transition-all duration-200"
        >
          Connect Store
        </Button>
      </motion.div>
    </motion.div>
  );
}

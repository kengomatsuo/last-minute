import { motion } from 'framer-motion'

const Error404 = () => {
  return (
    <motion.div className="flex flex-col flex-1 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >
      <h1>404 Page not found</h1>
      <p>The page you are looking for does not exist.</p>
    </motion.div>
  )
}

export default Error404

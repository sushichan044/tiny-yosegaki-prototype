import s from "@/components/utils/line-seed-subset.module.css"

const LineSeedSubset = ({ children }: { children: React.ReactNode }) => {
  return <span className={s.root}>{children}</span>
}

export default LineSeedSubset

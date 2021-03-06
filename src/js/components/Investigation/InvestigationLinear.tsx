import React from "react"

import {getKey} from "../../lib/finding"
import {useFindings} from "./useFindings"
import AnimateChildren from "../AnimateChildren"
import FindingCard from "./FindingCard"
import EmptySection from "../common/EmptySection"
import BookIcon from "../../icons/BookSvgIcon"
import {useSelector} from "react-redux"
import Current from "../../state/Current"

export default React.memo<{}>(function InvestigationLinear() {
  const findings = useFindings()
  const workspaceId = useSelector(Current.getWorkspaceId)
  const poolId = useSelector(Current.getPoolId)

  const cards = []

  findings.forEach((f) => {
    cards.push(
      <FindingCard
        key={getKey(f)}
        finding={f}
        workspaceId={workspaceId}
        poolId={poolId}
      />
    )
  })

  if (cards.length === 0)
    return (
      <EmptySection
        icon={<BookIcon />}
        message="As you search through your data, your history will appear here."
      />
    )

  return <AnimateChildren>{cards}</AnimateChildren>
})

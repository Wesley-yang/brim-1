/* @flow */
import {useDispatch, useSelector} from "react-redux"
import React from "react"
import classNames from "classnames"

import SpanDuration from "./SpanDuration"
import TimePickerButton from "./TimePickerButton"
import TimeSpanMenu from "./TimeSpanMenu"
import search from "../state/search"

export default function TimeSpanPickers() {
  let next = useSelector(search.getComputedSpan)
  let prev = useSelector(search.getSpanAsDates)
  let [from, to] = next || prev
  let dispatch = useDispatch()

  function fromChange(date) {
    dispatch(search.setSpanArgsFromDates([date, to]))
  }

  function toChange(date) {
    dispatch(search.setSpanArgsFromDates([from, date]))
  }

  return (
    <div className={classNames("time-span-pickers")}>
      <TimePickerButton date={from} onChange={fromChange} />
      <SpanDuration spanArgs={[from, to]} />
      <TimePickerButton date={to} onChange={toChange} />
      <TimeSpanMenu />
    </div>
  )
}

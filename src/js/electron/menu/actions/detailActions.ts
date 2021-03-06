import {toZql} from "src/js/zql/toZql"
import {ZealotContext, zed, zjson} from "zealot"
import brim from "../../../brim"
import {openNewSearchTab} from "../../../flows/openNewSearchWindow"
import {
  appendQueryCountBy,
  appendQueryExclude,
  appendQueryIn,
  appendQueryInclude,
  appendQueryNotIn,
  appendQuerySortBy
} from "../../../flows/searchBar/actions"
import {viewLogDetail} from "../../../flows/viewLogDetail"
import lib from "../../../lib"
import open from "../../../lib/open"
import virusTotal from "../../../services/virusTotal"
import Modal from "../../../state/Modal"
import SearchBar from "../../../state/SearchBar"
import tab from "../../../state/Tab"
import action from "./action"

function buildDetailActions() {
  return {
    copy: action({
      name: "detail-cell-menu-copy",
      label: "Copy",
      listener(_dispatch, data: zjson.FieldRootRecord) {
        const f = ZealotContext.decodeField(data)
        lib.doc.copyToClipboard(f.data.toString())
      }
    }),
    countBy: action({
      name: "detail-cell-menu-count-by",
      label: "Count by field",
      listener(dispatch, data: zjson.FieldRootRecord) {
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQueryCountBy(ZealotContext.decodeField(data)))
        dispatch(openNewSearchTab())
      }
    }),
    detail: action({
      name: "detail-cell-menu-detail",
      label: "View details",
      listener(dispatch, log: zjson.RootRecord) {
        dispatch(viewLogDetail(ZealotContext.decodeRecord(log)))
      }
    }),
    exclude: action({
      name: "detail-cell-menu-exclude",
      label: "Filter != value in new search",
      listener(dispatch, field: zjson.FieldRootRecord) {
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQueryExclude(ZealotContext.decodeField(field)))
        dispatch(openNewSearchTab())
      }
    }),
    freshInclude: action({
      name: "detail-cell-menu-fresh-include",
      label: "New search with this value",
      listener(dispatch, field: zjson.FieldRootRecord) {
        const f = ZealotContext.decodeField(field)
        dispatch(SearchBar.clearSearchBar())
        dispatch(SearchBar.changeSearchBarInput(toZql(f.value)))
        dispatch(openNewSearchTab())
      }
    }),
    fromTime: action({
      name: "detail-cell-menu-from-time",
      label: 'Use as "start" time in new search',
      listener(dispatch, fieldJSON: zjson.FieldRootRecord) {
        const field = ZealotContext.decodeField(fieldJSON)
        const data = field.data
        if (data instanceof zed.Time) {
          dispatch(SearchBar.clearSearchBar())
          dispatch(tab.setFrom(brim.time(data.toDate()).toTs()))
          dispatch(openNewSearchTab())
        }
      }
    }),
    groupByDrillDown: action({
      name: "detail-cell-menu-pivot-to-logs",
      label: "Pivot to logs",
      listener(dispatch, program, log: zjson.RootRecord) {
        const newProgram = brim
          .program(program)
          .drillDown(ZealotContext.decodeRecord(log))
          .string()

        if (newProgram) {
          dispatch(SearchBar.clearSearchBar())
          dispatch(SearchBar.changeSearchBarInput(newProgram))
          dispatch(openNewSearchTab())
        }
      }
    }),
    include: action({
      name: "detail-cell-menu-include",
      label: "Filter = value in new search",
      listener(dispatch, field: zjson.FieldRootRecord) {
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQueryInclude(ZealotContext.decodeField(field)))
        dispatch(openNewSearchTab())
      }
    }),
    in: action({
      name: "detail-cell-menu-in",
      label: "Filter in field in new search",
      listener(dispatch, field: zjson.FieldRootRecord) {
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQueryIn(ZealotContext.decodeField(field)))
        dispatch(openNewSearchTab())
      }
    }),
    notIn: action({
      name: "detail-cell-menu-not-in",
      label: "Filter not in field in new search",
      listener(dispatch, field: zjson.FieldRootRecord) {
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQueryNotIn(ZealotContext.decodeField(field)))
        dispatch(openNewSearchTab())
      }
    }),
    logResult: action({
      name: "detail-cell-menu-log-result",
      label: "Log result to console",
      listener(_dispatch, field, log) {
        console.log(JSON.stringify(log))
        console.log(JSON.stringify(field))
      }
    }),
    sortAsc: action({
      name: "detail-cell-menu-sort-asc",
      label: "Sort A...Z",
      listener(dispatch, field: zjson.FieldRootRecord) {
        const f = ZealotContext.decodeField(field)
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQuerySortBy(f.name, "asc"))
        dispatch(openNewSearchTab())
      }
    }),
    sortDesc: action({
      name: "detail-cell-menu-sort-desc",
      label: "Sort Z...A",
      listener(dispatch, field: zjson.FieldRootRecord) {
        const f = ZealotContext.decodeField(field)
        dispatch(SearchBar.clearSearchBar())
        dispatch(appendQuerySortBy(f.name, "desc"))
        dispatch(openNewSearchTab())
      }
    }),
    toTime: action({
      name: "detail-cell-menu-to-time",
      label: 'Use as "end" time',
      listener(dispatch, data: zjson.FieldRootRecord) {
        const field = ZealotContext.decodeField(data)
        if (field.data instanceof zed.Time) {
          dispatch(SearchBar.clearSearchBar())
          dispatch(
            tab.setTo(
              brim
                .time(field.data.toDate())
                .add(1, "ms")
                .toTs()
            )
          )
          dispatch(openNewSearchTab())
        }
      }
    }),
    virusTotalRightclick: action({
      name: "detail-cell-menu-virus-total",
      label: "VirusTotal Lookup",
      listener(_dispatch, data: zjson.FieldRootRecord) {
        const field = ZealotContext.decodeField(data)
        open(virusTotal.url(field.data.toString()))
      }
    }),
    whoisRightclick: action({
      name: "detail-cell-menu-who-is",
      label: "Whois Lookup",
      listener(dispatch, data: zjson.FieldRootRecord) {
        const field = ZealotContext.decodeField(data)
        dispatch(Modal.show("whois", {addr: field.data.toString()}))
      }
    })
  }
}

export default buildDetailActions()

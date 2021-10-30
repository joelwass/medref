const data = require('./data.json')

export const search = (s) => {
  s = s.toLowerCase()
  const result = []
  // for each top level node
  data.forEach((topLevelNode) => {
    if (topLevelNode.name.toLowerCase().includes(s)) result.push(topLevelNode)

    // if there is an element section
    if (topLevelNode.section) {
      const sectionNodes = topLevelNode.section
      sectionNodes.forEach((sectionNode) => {
        const sectionNodeNameContains = sectionNode.section_name?.toLowerCase().includes(s)
        const sectionNodeName1Contains = sectionNode.section_name1?.toLowerCase().includes(s)

        if (sectionNodeNameContains || sectionNodeName1Contains) {
          result.push(sectionNode)
        }

        if (sectionNode.children) {
          childrenNodes = sectionNode.children
          childrenNodes.forEach((childNode) => {
            const childNameIncludes = childNode.child_name?.toLowerCase().includes(s)
            const childDescIncludes = childNode.child_desc?.toLowerCase().includes(s)

            if (childNameIncludes || childDescIncludes) {
              result.push(childNode)
            }

            if (childNode.subchildren) {
              const subchildren = childNode.subchildren
              subchildren.forEach((subChild) => {
                const subchildNameIncludes = subChild.child_name?.toLowerCase().includes(s)
                const subchildDescIncludes = subChild.child_desc?.toLowerCase().includes(s)

                if (subchildNameIncludes || subchildDescIncludes) {
                  result.push(subChild)
                }
              })
            }
          })
        }
      })
    }
  })

  return result
}

const data = require('./data.json')

/**
 * 
 * The data is structured as 
 * top level nodes (id) -> sections (section_id) -> children (?) (child_id) -> children (?) (child_id) -> child bullets (?)
 * the question mark signifies it is optional.
 * 
 * If the section has a name, then the children will sub link to childDetails (i think)
 * If the section does NOT have a name, then the children will just be an expandable child
 */


export default (s) => {
  s = s.toLowerCase()
  const result = []
  // for each top level node
  data.forEach((topLevelNode) => {
    if (topLevelNode.name.toLowerCase().includes(s)) {
      const topLevelNodeCopy = {
        ...topLevelNode
      }
      delete topLevelNodeCopy.section 
      result.push(topLevelNodeCopy)
    }

    // if there is an element section
    if (topLevelNode.section) {
      const sectionNodes = topLevelNode.section
      sectionNodes.forEach((sectionNode) => {
        const sectionNodeNameContains = sectionNode.section_name?.toLowerCase().includes(s)
        const sectionNodeName1Contains = sectionNode.section_name1?.toLowerCase().includes(s)
        const sectionNodeName2Contains = sectionNode.section_name2?.toLowerCase().includes(s)

        if (sectionNodeNameContains || sectionNodeName1Contains || sectionNodeName2Contains) {
          const sectionNodeCopy = {
            ...sectionNode,
            id: sectionNode.section_id
          }
          if (sectionNode.multiple_lines) {
            let tempText = sectionNode.section_name1 ? sectionNode.section_name1 : ''
            let tempText1 = sectionNode.section_name2 ? sectionNode.section_name2 : ''
            sectionNodeCopy.section_name = sectionNode.section_name + ' ' + tempText + ' ' + tempText1
          }
          delete sectionNodeCopy.children
          result.push(sectionNodeCopy)
        }

        if (sectionNode.children) {
          const childrenNodes = sectionNode.children
          childrenNodes.forEach((childNode) => {
            const childNameIncludes = childNode.child_name?.toLowerCase().includes(s)
            const childDescIncludes = childNode.child_desc?.toLowerCase().includes(s)

            let foundMatchInChildNode = false

            if (childNameIncludes || childDescIncludes) {
              foundMatchInChildNode = true
            } else if (childNode.children) {
              const subchildren = childNode.children
              subchildren.forEach((subChild) => {
                const subchildNameIncludes = subChild.child_detail_name?.toLowerCase().includes(s)
                const subchildDescIncludes = subChild.child_detail_desc?.toLowerCase().includes(s)

                // If any of the subChilds have the string, then push the child, not the subChild, since
                // the subChild isn't it's own node, it's just an expandable piece of details of the child node.
                if (subchildNameIncludes || subchildDescIncludes) {
                  foundMatchInChildNode = true
                }
              })
            }

            // If a match was found in either of the child node, or the child node's children, push the child node
            if (foundMatchInChildNode) {
              const childNodeCopy = {
                ...childNode,
                id: childNode.child_id,
                hexvalue: sectionNode.section_hexvalue
              }
              delete childNodeCopy.children
              result.push(childNodeCopy)
            }
          })
        }
      })
    }
  })

  // before we return the results, we want to dedupe on the Id's 
  const hashTableOfIds = new Map()
  const resultsDeDuped = []
  for (let i = 0; i < result.length; i++) {
    let curr = result[i]
    // If the hash table of id's already has the id, continue
    if (hashTableOfIds.has(curr.id)) continue
    else {
      hashTableOfIds.set(curr.id, true)
      resultsDeDuped.push(curr)
    }
  }
  return resultsDeDuped
}



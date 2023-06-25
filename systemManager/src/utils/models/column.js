import { changeValidateStatus, createValidateForm } from "@ysstech-data/data-web/dist/form/utils"
import { isObject } from "lodash"

export default function FormColumnUtils(model, props) {

    const { column } = props;

    if (column) {
        if(!model.mutations.hasOwnProperty("_btnsHandle")) {
            model.addMutation("_btnsHandle", (state, { name, record }, { mutations }) => {
                mutations[name] && mutations[name](...record)
            }) 
        }
        
        column.forEach(item => {

            const { props, field, id } = item;

            if (props) {
                const { onHandle, verify } = props
                
                if (onHandle) {
                    const { onHandle } = props;
                    
                    onHandle.forEach(node => {
                        const { eventsName, mutations } = node
                        
                        props[eventsName] = async (...record) => {
                            
                            if (mutations) {
                                model.mutations._btnsHandle({ name: mutations, record })
                            }

                            const data = model.getState().getIn(field.split("."))
                            const initData = model.getState().getIn(["_formData", "data", id])

                            if (verify && verify.isVerify && verify.eventsName === eventsName && data && initData !== data) {
                                const dataPath = item.field.split(".")

                                dataPath.pop()

                                const dataObj = model.getState().getIn(dataPath).toJS()

                                const { verify: verifyResult, msg } = await verify.async(dataObj);

                                const validateStatus = verifyResult? "success": "error"

                                const param = {
                                    "formField": dataPath.shift(),
                                    "validateField": item.validateField,
                                    "validateConfig": {
                                        validateStatus,
                                        help: msg
                                    }
                                }

                                model.mutations._changeValidateStatus(param)

                            }
                            
                        }
                    })
                }
                
            }

            
        })

        return {
            column
        }
    }
    
}

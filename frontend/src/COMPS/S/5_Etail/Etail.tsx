import { Paper, styled } from "@mui/material"
import { GenericAutoComplete, IAutoCompleteOptions } from "../../Helpers/GenericAutoComplete"

const EtailPaper = styled(Paper)({
    display: 'flex',
    flexFlow: 'column',
    margin: 0,
    padding: 20,
    flex: 1,
    [`& .card-content`]: {
        margin: '10px 0',
        [`& .MuiPaper-root.MuiPaper-elevation`]: {
            marginBottom: 0,
        }
    }
})

const WBar = styled('div')({
    height: 50,
    width: '100%',
    background: 'white',
    margin: '0 0 10px 0',

})

const WBody = styled('div')({
    display: 'flex',
    gap: 10,
    width: '100%',
    height: 'calc(100% - 50px)',
    padding: '0 10px 10px 10px'
})
    const getSelectedOption = (option: string, id: number | string): IAutoCompleteOptions | null => {
        let result: IAutoCompleteOptions | null = null;
        switch (option) {
        //  
          default:
            result = { id: 0, label: '' } as IAutoCompleteOptions;
            break;
        }
        return result;
      };

type EtailProps = {
    id: number
}
export default function Etail (props: EtailProps) {

    return <>
    <div style={{
        margin: 0,
        padding: '20px 0 0 0',
        gap: 10,
        width: '100%',
        height: '100%',
        flex: 1,

    }}>
        <WBar>

        </WBar>
        <WBody>
            <EtailPaper>
                 <GenericAutoComplete
                    id="requestDetailStatus"
                    inputProps={{ name: "RFD Status", label: "RFD Status" }}
                    disableClearable={true}
                    size='small'
                    style={{ marginBottom: '16px' }}
                    renderOptionProps={{ sx: { fontSize: '12px' } }}
                    //
                    allOptions={[]
                        // rfdDialogFormInput.cadDrawingStatusCode !== plm.cadDrawingStatusCode.Approved
                        // ? allStatus
                        // : allStatus.map(item => {
                        //     if (item.label === "Pending") return { ...item, isActive: false };
                        //     return item;
                        // })
                    }
                    value={getSelectedOption('', 'P')}
                />
            </EtailPaper>
            <EtailPaper >
            </EtailPaper>
            <EtailPaper>
            </EtailPaper>
        </WBody>
    </div>

    </>

}
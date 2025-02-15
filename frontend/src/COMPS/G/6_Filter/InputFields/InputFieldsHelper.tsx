export const useMainFilterInputFieldsHelper = () => {
    const adjustDocumentLibraryFilter = () => {
        // adjust the document widget filter input fields height
        var docElem = document.querySelector('.document-widget-general-filter');
        var parentElem = docElem?.closest('.MuiPaper-root.MuiPaper-elevation') as HTMLElement | null;
        if (docElem && parentElem) {
            var _docElem = docElem as HTMLElement;
            _docElem.style.height = '90vh';

            parentElem.style.paddingTop = '1px';
            parentElem.style.paddingBottom = '0';

            parentElem.style.boxShadow = 'none';
            parentElem.style.overflowY = 'unset';
        }

        //
        var docElem2 = document.querySelector('.document-widget-input-filter-for-plm');
        var parentElem2 = docElem2?.closest('.MuiPaper-root.MuiPaper-elevation') as HTMLElement | null;
        if (docElem2 && parentElem2) {
            var _docElem2 = docElem2 as HTMLElement;
            _docElem2.style.height = '90vh';            

            parentElem2.style.paddingTop = '1px';
            parentElem2.style.paddingBottom = '0';

            parentElem2.style.boxShadow = 'none';
            parentElem2.style.overflowY = 'unset';
        }
    }
    return {
        adjustDocumentLibraryFilter
    }
}
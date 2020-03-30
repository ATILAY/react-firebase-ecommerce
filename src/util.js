
export default  function  formatCurrency (num){
    const empty= " ";
        return "$"+ Number(num.toFixed(2)).toLocaleString()+' '+empty + '    ';

    }

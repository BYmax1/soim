$(document).ready(function()
{        
    $("form button").click(function()
    {
      var val_s2=$("#s2").val();
      var val_s1=$("#s1").val();
      var url="manage?NavId="+val_s1+"&SubNavId="+val_s2;
      console.log(url);
    });
    $("#s1").change(function()
    {
       var SubNav={"sn1":["学院简介","院系介绍","硕博点简介","学院领导","历任领导","服务指南及联系方式"],
               "sn2":["专业设置","研究生教育","数学建模"],
               "sn3":["博士生导师","硕士生导师","学科带头人"],
               "sn4":["重点学科","科研成果","核心期刊"],
               "sn5":["本科生招生","硕士研究生招生","博士研究生招生"],
               "sn6":["组织建设","教育管理","主题教育"],
               "sn7":["学生会","学工动态","管理制度"],
               "sn8":["合作院校","留学项目","教师出访"],
               "sn9":["人才招聘"],
               "sn11":["学院通知"],
               "sn13":["研究生教育"],
               "sn14":["学生工作"],
               "sn15":["学术公告"],
               "sn12":["教学科研"],
               "sn16":["服务专栏"],
               "sn10":["校友园地"]
               };     
       var htmlTxt;
       var val_s1=$("#s1").val();
       for(var i=1;i<SubNav["sn"+val_s1].length+1;i++)
       	    htmlTxt+="<option value="+i+">"+SubNav["sn"+val_s1][i-1]+"</option>";
       $("#s2").html(htmlTxt);
    });
}); 
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var connToken = '90935059|-31949247441154828|90903959';

$(document).ready(function () {
    resetForm();
});

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getRollNoAsJsonObj() {
    var rollno = $("#rollno").val();
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fullname").val(record.fullname);
    $("#stuclass").val(record.stuclass);
    $("#birthdate").val(record.birthdate);
    $("#address").val(record.address);
    $("#enrollmentdate").val(record.enrollmentdate);
}

function resetForm() {
    $("#rollno").val("");
    $("#fullname").val("");
    $("#stuclass").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrollmentdate").val("");

    $("#rollno").prop('disabled', false);
    $("#fullname").prop('disabled', true);
    $("#stuclass").prop('disabled', true);
    $("#birthdate").prop('disabled', true);
    $("#address").prop('disabled', true);
    $("#enrollmentdate").prop('disabled', true);

    $("#save").prop('disabled', true);
    $("#update").prop('disabled', true);
    $("#reset").prop('disabled', true);

    $("#rollno").focus();
}

function validateData() {
    var rollno, fullname, stuclass, birthdate, address, enrollmentdate;
    rollno = $('#rollno').val();
    fullname = $('#fullname').val();
    stuclass = $('#stuclass').val();
    birthdate = $('#birthdate').val();
    address = $('#address').val();
    enrollmentdate = $('#enrollmentdate').val();

    if (rollno === '') {
        alert('Roll No missing');
        $('#rollno').focus();
        return '';
    }
    if (fullname === '') {
        alert('Full Name missing');
        $('#fullname').focus();
        return '';
    }
    if (stuclass === '') {
        alert('Class missing');
        $('#stuclass').focus();
        return '';
    }
    if (birthdate === '') {
        alert('Birth Date missing');
        $('#birthdate').focus();
        return '';
    }
    if (address === '') {
        alert('Address missing');
        $('#address').focus();
        return '';
    }
    if (enrollmentdate === '') {
        alert('Enrollment Date missing');
        $('#enrollmentdate').focus();
        return '';
    }

    var jsonStrObj = {
        id: rollno,
        fullname: fullname,
        stuclass: stuclass,
        birthdate: birthdate,
        address: address,
        enrollmentdate: enrollmentdate
    };
    return JSON.stringify(jsonStrObj);
}

function getStudent() {
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        // Roll No does NOT exist yet -> new entry
        $('#fullname').prop("disabled", false);
        $('#stuclass').prop("disabled", false);
        $('#birthdate').prop("disabled", false);
        $('#address').prop("disabled", false);
        $('#enrollmentdate').prop("disabled", false);

        $('#save').prop("disabled", false);
        $('#reset').prop('disabled', false);
        $('#fullname').focus();

    } else if (resJsonObj.status === 200) {
        // Roll No exists -> editing existing student
        $('#rollno').prop("disabled", true);
        fillData(resJsonObj);

        $('#fullname').prop("disabled", false);
        $('#stuclass').prop("disabled", false);
        $('#birthdate').prop("disabled", false);
        $('#address').prop("disabled", false);
        $('#enrollmentdate').prop("disabled", false);

        $('#update').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#fullname').focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return '';
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rollno').focus();
}

function updateData() {
    $('#update').prop("disabled", true);
    var jsonChg = validateData();
    if (jsonChg === '') {
        return '';
    }
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
}


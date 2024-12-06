/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import "./GroupRole.scss";
import { fetchAllGroups } from "../../services/userService";
import {
  fetchAllRoleNotWithPaginate,
  fetchRoleByGroup,
  assignRoleToGroup,
} from "../../services/roleService";
import { toast } from "react-toastify";
import _ from "lodash";

function GroupRole() {
  const [userGroups, setUserGroups] = useState([]);
  const [selectGroups, setSelectGroups] = useState("");
  const [listRoles, setListRoles] = useState([]);

  const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

  useEffect(() => {
    fetchGroups();
    getAllRoles();
  }, []);

  const fetchGroups = async () => {
    const response = await fetchAllGroups();
    if (response && response.EC === 0) {
      setUserGroups(response.DT);
    } else {
      toast.error(response.EM);
    }
  };

  const getAllRoles = async () => {
    let data = await fetchAllRoleNotWithPaginate();

    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleOnchangeGroup = async (value) => {
    setSelectGroups(value);
    if (value) {
      let data = await fetchRoleByGroup(value);
      console.log(data);
      if (data && +data.EC === 0) {
        let result = buildDataByGroup(data.DT.Roles, listRoles);
        setAssignRoleByGroup(result);
      }
    }
  };

  const buildDataByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let obj = {};
        obj.url = role.url;
        obj.id = role.id;
        obj.description = role.description;
        obj.isAssign = false;

        if (groupRoles && groupRoles.length > 0) {
          obj.isAssign = groupRoles.some((item) => item.url === obj.url);
        }

        result.push(obj);
      });
    }

    return result;
  };

  const handleSeclectRole = (value) => {
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
    let foundIndex = _assignRoleByGroup.findIndex(
      (item) => +item.id === +value
    );

    if (foundIndex > -1) {
      _assignRoleByGroup[foundIndex].isAssign =
        !_assignRoleByGroup[foundIndex].isAssign;

      setAssignRoleByGroup(_assignRoleByGroup);
    }
  };

  const buildDataToSave = () => {
    // data = {groupId: 4, groupRoles: [{}, {}, {}, {}, {},...]}
    let result = {};
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);

    let groupRolesFilter = _assignRoleByGroup.filter(
      (item) => item.isAssign === true
    );
    let groupRolesFinal = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroups, roleId: item.id };
      return data;
    });

    result.groupId = selectGroups;
    result.groupRoles = groupRolesFinal;

    return result;
  };

  const handleSave = async () => {
    let data = buildDataToSave();

    //Assign Roles to Group
    let response = await assignRoleToGroup(data);
    if (response && response.EC === 0) {
      toast.success(response.EM);
    } else {
      toast.error(response.EM);
    }
  };
  return (
    <div className="group-role-container">
      <div className="container">
        <div className="row mt-3">
          <h4>Group Role:</h4>
          <div className="assign-group-role">
            <div className="col-12 col-md-6 form-group">
              <label>
                Select Group: &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <select
                className="form-select"
                onChange={(e) => handleOnchangeGroup(e.target.value)}
              >
                <option value="">Please select your group</option>
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <hr />
          {selectGroups && (
            <>
              <div className="assign-roles">
                <h5>Assign Roles:</h5>
                {assignRoleByGroup &&
                  assignRoleByGroup.length > 0 &&
                  assignRoleByGroup.map((item, index) => {
                    return (
                      <div className="form-check" key={`list-role-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`list-role-${index}`}
                          checked={item.isAssign}
                          onChange={(e) => handleSeclectRole(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`list-role-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-3">
                <button className="btn btn-info" onClick={() => handleSave()}>
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupRole;
